import * as crypto from 'crypto'
import { v4 as uuid } from 'uuid'
import User from '../model/user'

export default async (req, res) => {
  try {
    const { phone, password } = req.body as { phone: string; password: string }

    if (!phone || !password)
      throw new Error('账号密码不正确')

    const user = await User.findOne({ phone })

    if (!user)
      throw new Error('账号密码不正确')

    const hash = crypto.createHash('md5')
    hash.update(password)

    const hashedValue = hash.digest('hex')

    if (hashedValue !== user.password)
      throw new Error('账号密码不正确')

    user.token = uuid()
    user.save()

    res.send({ status: 'Success', message: 'Verify successfully', data: { token: user.token } })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
}
