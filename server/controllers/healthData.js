
import HealthData from '../model/healthData'
// import md5 from 'md5'

const healthDataGet = async (ctx, next) => {
  const id = ctx.state.user.id
  try {
    const result = await HealthData.findByUserId(id, 0, 10)
    ctx.status = 200
    ctx.body = result
  } catch (err) {
    ctx.status = 500
    ctx.body = {err}
  }
}

const healthDataSkipGet = async (ctx, next) => {
  const id = ctx.state.user.id
  try {
    const result = await HealthData.findByUserId(id, ctx.params.page * 10, 10)
    ctx.status = 200
    ctx.body = result
  } catch (err) {
    ctx.status = 500
    ctx.body = {err}
  }
}

const healthDataPost = async (ctx, next) => {
  const body = ctx.request.body
  const id = ctx.state.user.id
  body.userid = id

  try {
    const dataInfo = new HealthData(body)
    // dataIn
    const result = await dataInfo.add()
    ctx.status = 200
    ctx.body = result
  } catch (err) {
    ctx.status = 500
    ctx.body = {err}
  }
}

export default {
  healthDataGet,
  healthDataSkipGet,
  healthDataPost
}
