import { Router } from 'express'
import {
  createDeckController,
  updateDeckController,
  getDeckByIdController,
  getFilteredDecksController,
  deleteDeckController,
  incrementViewCountController,
  cloneDeckController,
  exportDeckController,
  importDeckController,
} from '../controllers/deck.controller'
import {
  authMiddleware,
  adminMiddleware,
  validateDeck,
  validateDeckUpdate,
} from '../middlewares'

const router = Router()

// Protected routes
router.get('/:id', authMiddleware, adminMiddleware, getDeckByIdController)

// Public routes
router.post('/', authMiddleware, validateDeck, createDeckController)
router.put('/:id', authMiddleware, validateDeckUpdate, updateDeckController)
router.get('/', authMiddleware, getFilteredDecksController)
router.delete('/:id', authMiddleware, deleteDeckController)
router.put('/increment-view/:id', authMiddleware, incrementViewCountController)
router.post('/clone', authMiddleware, cloneDeckController)
router.get('/export/:id', authMiddleware, exportDeckController)
router.post('/import', authMiddleware, importDeckController)

export { router as deckRoutes }
