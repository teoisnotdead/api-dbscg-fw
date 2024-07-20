import { Router } from 'express'
import { createCardController, updateCardController, getCardByIdController, getAllCardsController, deleteCardController } from '../controllers/card.controller'
const router = Router()

router.post('/', createCardController)
router.put('/:id', updateCardController)
router.get('/:id', getCardByIdController)
router.get('/', getAllCardsController)
router.delete('/:id', deleteCardController)

export { router as cardRoutes }
