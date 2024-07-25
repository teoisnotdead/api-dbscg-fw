import { Router } from 'express'
import {
  registerController,
  loginController,
} from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/register', registerController)
router.post('/login', loginController)

export { router as authRoutes }
