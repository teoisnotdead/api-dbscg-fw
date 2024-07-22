import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { DeckInterface } from '../domain/interfaces/deck.interface'

// Validaciones comunes para ambos, creación y actualización
const commonFields = [
  body('deck_name').optional().notEmpty().withMessage('Deck name is required'),
  body('deck_type').optional().notEmpty().withMessage('Deck type is required'),
  body('deck_subtype').optional().notEmpty().withMessage('Deck subtype is required'),
  body('deck_format').optional().notEmpty().withMessage('Deck format is required'),
  body('deck_game_type').optional().notEmpty().withMessage('Deck game type is required'),
  body('deck_leader.card_number').optional().notEmpty().withMessage('Deck leader card number is required'),
  body('deck_leader.card_front_name').optional().notEmpty().withMessage('Deck leader card front name is required'),
  body('deck_leader.card_front_power').optional().notEmpty().withMessage('Deck leader card front power is required'),
  body('deck_leader.card_front_trait').optional().notEmpty().withMessage('Deck leader card front trait is required'),
  body('deck_leader.card_rarity').optional().notEmpty().withMessage('Deck leader card rarity is required'),
  body('deck_leader.card_type').optional().notEmpty().withMessage('Deck leader card type is required'),
  body('deck_leader.card_series').optional().notEmpty().withMessage('Deck leader card series is required'),
  body('deck_leader.image_front').optional().notEmpty().withMessage('Deck leader image front is required'),
]

const validateDeckLogic = (req: Request, res: Response, next: NextFunction) => {
  const deckData: DeckInterface = req.body

  if (!deckData.deck_leader || !deckData.deck_leader.card_number) {
    return res.status(400).json({ message: 'Deck leader card number is required' })
  }

  next()
}

const validateDeck = [
  ...commonFields.map(field => field.exists()),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  validateDeckLogic,
]

const validateDeckUpdate = [
  ...commonFields,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

export { validateDeck, validateDeckUpdate }
