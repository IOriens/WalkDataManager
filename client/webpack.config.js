require('webpack')
require('weex-loader')
const fs = require('fs')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const path = require('path')
const ip = require('ip')
var entry = {}
var bannerExcludeFiles = []

const address = ip.address()

function walk (dir) {
  dir = dir || '.'
  var directory = path.join(__dirname, 'src', dir)
  fs.readdirSync(directory)
    .forEach(function (file) {
      var fullpath = path.join(directory, file)
      var stat = fs.statSync(fullpath)
      var extname = path.extname(fullpath)
      if (stat.isFile() && (extname === '.we' || extname === '.vue')) {
        var name = file.split('.')[0]
        entry[name] = fullpath + '?entry=true'
        if (extname === '.we') {
          bannerExcludeFiles.push(name + '.js')
        }
      } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
        var subdir = path.join(dir, file)
        walk(subdir)
      }
    })
}

walk()
console.log(entry)
console.log({
  main: path.join(__dirname, 'src', 'weex-bootstrap.we?entry=true'),
  'login-reg': path.join(__dirname, 'src', 'login-reg.we?entry=true'),
  'dashboard': path.join(__dirname, 'src', 'dashboard.we?entry=true')
})

module.exports = {
  entry: entry,
  output: {
    path: 'dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.we(\?[^?]+)?$/,
        loaders: ['weex-loader']
      },
      {
        test: /\.js$/,
        loaders: ['babel']
      }, {
        test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
    // loaders: ["url?limit=1024&name=img2/[name].[ext]"],
        loaders: ['url?limit=2024&name=[path][hash:8].[name].[ext]'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new LiveReloadPlugin({port: 8089}),
    new OpenBrowserPlugin({ url: `http://${address}:8080` })
  ],
  externals: {
    'Config': JSON.stringify(process.env.ENV === 'production' ? {
      serverUrl: 'https://myserver.com'
    } : {
      serverUrl: `http://${address}:3000`
    })
  }
}
