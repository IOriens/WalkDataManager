
import User from '../model/user'
// import md5 from 'md5'

const usersGet = (ctx, next) => {

}

const usersPost = async (ctx, next) => {
  const body = ctx.request.body

  try {
    // 查找用户是否存在
    const userExist = await User.findByName(body.username)
    if (userExist) {
      ctx.status = 202
      ctx.body = {'msg': 'user exists'}
    } else {
      // 不存在则保存读取请求json并保存到数据库中
      const userNum = await User.countUser()

      // 读取json并通过用户模型生成要保存的实例
      const user = new User({
        username: body.username,
        email: body.email,
        password: body.password,
        userid: userNum + 1
      })

      await user.add()
      ctx.status = 200
      ctx.body = {'msg': 'user created'}
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = {err}
  }
}

export default {
  usersGet,
  usersPost
}
