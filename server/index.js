import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaJwt from 'koa-jwt'
import mongoose from 'mongoose'
import Debug from 'debug'

import routes from './routes'
import config from './config'
import DataWorker from './common/worker'

const app = new Koa()

const debug = new Debug('http')

mongoose.Promise = global.Promise
mongoose.connect(config.mongooseURL)
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'))

const worker = new DataWorker()
worker.run()

app.use(function (ctx, next) {
  debug(ctx.method + ' ' + ctx.url)

  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get access\n'
    } else {
      throw err
    }
  })
})

app.use(koaJwt({ secret: config.secretString }).unless({ path: [/^\/authentication/, /^\/api\/users(\/)?$/] }))

app.use(bodyParser())

routes(app)

app.listen(3000, () => {
  debug('listening')
})
