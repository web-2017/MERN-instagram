import express from 'express'

const router = express.Router()

import requireLogin from '../middleware/requireLogin.js'
import { signUp, protectedVerification, signIn, resetPassword, setNewPassword } from '../controllers/authContoller.js'

router.get('/protected', requireLogin, protectedVerification)
    .post('/signup', signUp)
    .post('/signin', signIn)
    .post('/reset-password', resetPassword)
    .post('/new-password', setNewPassword)

export default router
