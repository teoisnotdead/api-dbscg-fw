import { Router } from 'express'
import {
  registerController,
  loginController,
  getUserController,
} from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/user.middleware'

const router = Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/me', authMiddleware, getUserController)

export { router as userRoutes }
