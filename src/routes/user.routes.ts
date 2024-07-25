import { Router } from 'express'
import {
  registerController,
  loginController,
  getUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/user', authMiddleware, getUserController)
router.get('/users', authMiddleware, getUsersController)
router.put('/user/:id', authMiddleware, updateUserController)
router.delete('/user/:id', authMiddleware, deleteUserController)

export { router as userRoutes }
