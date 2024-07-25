import { Router } from 'express'
import {
  createCardController,
  updateCardController,
  getCardByIdController,
  deleteCardController,
  getFilteredCardsController,
  getCardByNumberController,
  incrementViewCountController,
} from '../controllers/card.controller'
import { validateCard, validateCardUpdate } from '../middlewares/card.middleware'

const router = Router()

router.post('/', validateCard, createCardController)
router.put('/:id', validateCardUpdate, updateCardController)
router.get('/:id', getCardByIdController)
router.get('/', getFilteredCardsController)
router.delete('/:id', deleteCardController)
router.get('/card-number/:card_number', getCardByNumberController)
router.put('/increment-view/:card_number', incrementViewCountController)

export { router as cardRoutes }
