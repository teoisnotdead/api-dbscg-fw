import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { CardInterface } from '../domain/interfaces/card.interface'

// Validaciones comunes para ambos, creación y actualización
const commonFields = [
  body('card_color').optional().notEmpty().withMessage('Card color is required'),
  body('card_number').optional().notEmpty().withMessage('Card number is required'),
  body('card_front_name').optional().notEmpty().withMessage('Card front name is required'),
  body('card_front_power').optional().notEmpty().withMessage('Card front power is required'),
  body('card_front_trait').optional().notEmpty().withMessage('Card front trait is required'),
  body('card_rarity').optional().notEmpty().withMessage('Card rarity is required'),
  body('card_type').optional().notEmpty().withMessage('Card type is required'),
  body('card_series').optional().notEmpty().withMessage('Card series is required'),
  body('image_front').optional().notEmpty().withMessage('Image front is required'),
]

const validateCardLogic = (req: Request, res: Response, next: NextFunction) => {
  const cardData: CardInterface = req.body

  // Validación específica para cartas de tipo "Leader"
  if (cardData.card_type === 'Leader') {
    if (!cardData.image_back) {
      return res.status(400).json({ message: 'Leader cards must have an image_back' })
    }
    if (cardData.card_energy_cost) {
      return res.status(400).json({ message: 'Leader cards should not have card_energy_cost' })
    }
  } else {
    if (!cardData.card_energy_cost) {
      return res.status(400).json({ message: 'Non-Leader cards must have card_energy_cost' })
    }
  }

  next()
}

const validateCard = [
  ...commonFields.map(field => field.exists()),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  validateCardLogic,
]

const validateCardUpdate = [
  ...commonFields,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

export { validateCard, validateCardUpdate }
