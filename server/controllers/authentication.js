const jwt = require('jsonwebtoken')
import config from '../config'

export default (ctx, next) => {
  const req = ctx.request.body
  console.log(req)
  if (!(req.username === 'john.doe' && req.password === 'foobar')) {
    ctx.status = 401
    ctx.body = 'Wrong user or password'
    return
  }

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  }

        // We are sending the profile inside the token
  const token = jwt.sign(profile, config.secretString, { expiresIn: 60 * 3 })
  ctx.body = ({ token: token })
}
