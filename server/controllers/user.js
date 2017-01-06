
import User from '../model/user'
// import md5 from 'md5'

const usersGet = (ctx, next) => {

}

const usersPost = async (ctx, next) => {
  const body = ctx.request.body

  try {
    const userExist = await User.findByName(body.username)
    if (userExist) {
      ctx.status = 202
      ctx.body = {'msg': 'user exists'}
    } else {
      const userNum = await User.countUser()

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
