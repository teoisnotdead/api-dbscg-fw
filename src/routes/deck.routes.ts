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
  importDeckController
} from '../controllers/deck.controller'
import { validateDeck, validateDeckUpdate } from '../middlewares/validateDeck'
const router = Router()

router.post('/', validateDeck, createDeckController)
router.put('/:id', validateDeckUpdate, updateDeckController)
router.get('/:id', getDeckByIdController)
router.get('/', getFilteredDecksController)
router.delete('/:id', deleteDeckController)
router.put('/increment-view/:id', incrementViewCountController)
router.post('/clone', cloneDeckController)
router.get('/export/:id', exportDeckController)
router.post('/import', importDeckController)

export { router as deckRoutes }
