import { Router } from 'express'
import {
  registerController,
  loginController,
} from '../controllers/auth.controller'
import { validateUser } from '../middlewares/user.middleware'

const router = Router()

router.post('/register', validateUser, registerController)
router.post('/login', loginController)

export { router as authRoutes }
