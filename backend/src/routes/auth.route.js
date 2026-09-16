import { Router } from 'express'
import {
  loginController,
  logoutController,
  registerController
} from '../controllers/auth.controller.js'
import { authUserMiddleware } from '../middlewares/auth.middleware.js'

const authRouter = Router()

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.post('/logout', authUserMiddleware, logoutController)
authRouter.get('/me', authUserMiddleware, logoutController)

export default authRouter
