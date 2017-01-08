import jwt from 'jsonwebtoken'
import md5 from 'md5'
import config from '../config'
import User from '../model/user.js'

export default async (ctx, next) => {
  const req = ctx.request.body

  // 从数据库中读取用户信息
  const userInfo = await User.findByName(req.username)

  // 比对用户密码，为保证安全性，数据库中使用md5保存密码
  if (!(userInfo && md5(req.password) === userInfo.password)) {
    ctx.status = 401
    ctx.body = {'msg': 'Wrong user or password'}
    return
  }

  // 将用户信息存在jwt中，下次访问用来识别用户
  var profile = {
    username: userInfo.username,
    email: userInfo.email,
    id: userInfo.userid
  }
  // 生成jwt token
  const token = jwt.sign(profile, config.secretString, { expiresIn: '10d' })

  // 通过Json返回给客户端
  ctx.body = ({ token: token })
}
