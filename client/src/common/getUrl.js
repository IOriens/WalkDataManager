var getUrl = function (bundleUrl, fileName, dir, host, h5baseFlag) {
  var nativeBase
  var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0
  var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0
  if (isAndroidAssets) {
    nativeBase = 'file://assets/'
  } else if (isiOSAssets) {
    nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1)
  } else {
    host = host || 'localhost:8080'
    var matches = /\/\/([^/]+?)\//.exec(bundleUrl)
    if (matches && matches.length >= 2) {
      host = matches[1]
    }
    nativeBase = 'http://' + host + '/' + dir + '/'
  }
  var h5Base = h5baseFlag == null ? './index.html?page=./' + dir + '/' : './' + dir + '/'
  var base = nativeBase
  if (typeof window === 'object') {
    base = h5Base
  }
  return base + fileName
}

export default getUrl
