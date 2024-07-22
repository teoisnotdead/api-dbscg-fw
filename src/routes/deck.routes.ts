import { Router } from 'express'
import {
  createDeckController,
  updateDeckController,
  getDeckByIdController,
  getFilteredDecksController,
  deleteDeckController,
  incrementViewCountController,
} from '../controllers/deck.controller'
import { validateDeck, validateDeckUpdate } from '../middlewares/validateDeck'
const router = Router()

router.post('/', validateDeck, createDeckController)
router.put('/:id', validateDeckUpdate, updateDeckController)
router.get('/:id', getDeckByIdController)
router.get('/', getFilteredDecksController)
router.delete('/:id', deleteDeckController)
router.put('/increment-view/:id', incrementViewCountController)

export { router as deckRoutes }
