import { Router } from 'express'
import { authMiddleware, adminMiddleware } from '../middlewares'
import { createAdminController, updateUserRoleController } from '../controllers/admin.controller'

const router = Router()

router.post('/create-admin', authMiddleware, adminMiddleware, createAdminController)
router.put('/update-role/:id', authMiddleware, adminMiddleware, updateUserRoleController)

export { router as adminRoutes }
