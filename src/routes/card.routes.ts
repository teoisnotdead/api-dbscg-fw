import { Router } from 'express'
import {
  createCardController,
  updateCardController,
  getCardByIdController,
  deleteCardController,
  getFilteredCardsController,
  getCardByNumberController,
  incrementViewCountController,
  insertManyCardsController,
} from '../controllers/card.controller'
import {
  authMiddleware,
  adminMiddleware,
  validateCard,
  validateCardUpdate
} from '../middlewares'

const router = Router()

// Protected routes
router.post('/', authMiddleware, adminMiddleware, validateCard, createCardController)
router.post('/builk-cards', authMiddleware, adminMiddleware, insertManyCardsController)
router.put('/:id', authMiddleware, adminMiddleware, validateCardUpdate, updateCardController)
router.get('/:id', authMiddleware, adminMiddleware, getCardByIdController)
router.delete('/:id', authMiddleware, adminMiddleware, deleteCardController)

// Public routes
router.get('/', authMiddleware, getFilteredCardsController)
router.get('/card-number/:card_number', authMiddleware, getCardByNumberController)
router.put('/increment-view/:card_number', authMiddleware, incrementViewCountController)

export { router as cardRoutes }
