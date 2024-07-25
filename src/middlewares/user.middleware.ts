import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { UserInterface } from '../domain/interfaces/user.interface'

// Validaciones comunes para ambos, creación y actualización
const commonFields = [
  body('username').optional().notEmpty().withMessage('Username is required'),
  body('email').optional().isEmail().withMessage('Email is required and must be valid'),
  body('password').optional().notEmpty().withMessage('Password is required'),
  body('role').optional().notEmpty().withMessage('Role is required'),
  body('nametag').optional().notEmpty().withMessage('Nametag is required'),
  body('subscription').optional().notEmpty().withMessage('Subscription is required'),
]

const validateUserLogic = (req: Request, res: Response, next: NextFunction) => {
  const userData: UserInterface = req.body

  if (!userData.username) {
    return res.status(400).json({ message: 'Username is required' })
  }

  if (!userData.email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  next()
}

const validateUser = [
  ...commonFields.map(field => field.exists()),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  validateUserLogic,
]

const validateUserUpdate = [
  ...commonFields,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

export { validateUser, validateUserUpdate }
