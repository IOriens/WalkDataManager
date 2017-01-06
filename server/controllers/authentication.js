import jwt from 'jsonwebtoken'
import md5 from 'md5'
import config from '../config'
import User from '../model/user.js'

export default async (ctx, next) => {
  const req = ctx.request.body
  const userInfo = await User.findByName(req.username)

  if (!(userInfo && md5(req.password) === userInfo.password)) {
    ctx.status = 401
    ctx.body = 'Wrong user or password'
    return
  }

  var profile = {
    username: userInfo.username,
    email: userInfo.email,
    id: userInfo.userid
  }

        // We are sending the profile inside the token
  const token = jwt.sign(profile, config.secretString, { expiresIn: '10d' })
  ctx.body = ({ token: token })
}
