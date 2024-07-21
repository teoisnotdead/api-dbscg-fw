import { Router } from 'express'
import { createCardController, updateCardController, getCardByIdController, deleteCardController, getFilteredCardsController  } from '../controllers/card.controller'
const router = Router()

router.post('/', createCardController)
router.put('/:id', updateCardController)
router.get('/:id', getCardByIdController)
router.get('/', getFilteredCardsController)
router.delete('/:id', deleteCardController)

export { router as cardRoutes }
