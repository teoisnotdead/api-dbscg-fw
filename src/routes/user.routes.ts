import { Router } from 'express'
import {
  getUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller'
import {
  authMiddleware,
  adminMiddleware,
  validateUserUpdate
} from '../middlewares'

const router = Router()

// Protected routes
router.get('/:id', authMiddleware, adminMiddleware, getUserController)
router.get('/', authMiddleware, adminMiddleware, getUsersController)

// Public routes
router.put('/:id', authMiddleware, validateUserUpdate, updateUserController)
router.delete('/:id', authMiddleware, deleteUserController)

export { router as userRoutes }
