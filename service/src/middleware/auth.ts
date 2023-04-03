import User from '../model/user'
import { isNotEmptyString } from '../utils/is'

const auth = async (req, res, next) => {
  const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
  if (isNotEmptyString(AUTH_SECRET_KEY)) {
    try {
      const authorization = req.header('Authorization')

      if (!authorization)
        throw new Error('无访问权限')

      const token = authorization.replace('Bearer ', '').trim()

      if (!token)
        throw new Error('无访问权限')

      const user = await User.findOne({ token })

      if (!user)
        throw new Error('无访问权限')

      if (user.expired_at && user.expired_at < new Date())
        throw new Error('您的账号过期了，请充值。')

      req.user = user

      next()
    }
    catch (error) {
      res.send({
        status: 'Unauthorized',
        message: error.message ?? 'Please authenticate.',
        data: null,
      })
    }
  }
  else {
    next()
  }
}

export { auth }
