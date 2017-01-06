import koaRouter from 'koa-router'
import authentication from '../controllers/authentication'
import user from '../controllers/user'
import info from '../controllers/info'
import healthData from '../controllers/healthData'

const router = koaRouter()

const routes = app => {
  app.use(router.routes()).use(router.allowedMethods())

  router.get('/', (ctx, next) => {
    ctx.body = 'Hello World'
  })

  router.post('/authentication', authentication)

  router.post('/api/users', user.usersPost)

  router.put('/api/users/:username', info.infoPut)
  router.get('/api/users/:username', info.infoGet)

  router.get('/api/users/:username/health-data', healthData.healthDataGet)
  router.get('/api/users/:username/health-data/:page', healthData.healthDataSkipGet)
  router.post('/api/users/:username/health-data', healthData.healthDataPost)
}

export default routes
