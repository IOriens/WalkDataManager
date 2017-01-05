import koaRouter from 'koa-router'
import authentication from '../controllers/authentication'
import user from '../controllers/user'

const router = koaRouter()

const routes = app => {
  app.use(router.routes()).use(router.allowedMethods())

  router.get('/', (ctx, next) => {
    ctx.body = 'Hello World'
  })

  router.post('/authentication', authentication)

  router.post('/api/users', user.usersPost)
}

export default routes
