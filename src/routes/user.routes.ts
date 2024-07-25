import { Router } from 'express'
import {
  getUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.get('/:id', authMiddleware, getUserController)
router.get('/', authMiddleware, getUsersController)
router.put('/:id', authMiddleware, updateUserController)
router.delete('/:id', authMiddleware, deleteUserController)

export { router as userRoutes }
