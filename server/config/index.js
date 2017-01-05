const defaultConfig = require('./default')

export default {
  secretString: process.env.JWT_SECRET_STRING || defaultConfig.secretString,
  mongooseURL: process.env.MONGOOSE_URL || defaultConfig.mongooseURL
}
