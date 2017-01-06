import Info from '../model/info'
// import md5 from 'md5'

const infoGet = async (ctx, next) => {
  try {
    const userInfo = await Info.findByUserId(ctx.state.user.id)
    ctx.status = 200
    ctx.body = userInfo
  } catch (err) {
    ctx.status = 500
    ctx.body = {err}
  }
}

const infoPut = async (ctx, next) => {
  const body = ctx.request.body
  try {
    const info = new Info(body)
    const refinedInfo = Object.assign({}, info.toObject())
    delete refinedInfo._id
  } catch (err) {
    ctx.status = 500
    ctx.body = {err}
  }
}

export default {
  infoGet,
  infoPut
}
