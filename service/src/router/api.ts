import express from 'express'
import checkToken from '../endpoint/check-token'
import createChat from '../endpoint/create-chat'
import createSession from '../endpoint/create-session'
import getConfig from '../endpoint/get-config'
import { auth } from '../middleware/auth'
import { limiter } from '../middleware/limiter'

const router = express.Router()

router.post('/chat-process', [auth, limiter], createChat)
router.get('/config', auth, getConfig)
router.post('/session', createSession)
router.post('/verify', checkToken)

export default router
