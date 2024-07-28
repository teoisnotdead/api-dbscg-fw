import { Application } from 'express'
import { cardRoutes } from './card.routes'
import { deckRoutes } from './deck.routes'
import { userRoutes } from './user.routes'
import { authRoutes } from './auth.routes'
import { adminRoutes } from './admin.routes'

export const registerRoutes = (app: Application): void => {
  app.use('/api/cards', cardRoutes)
  app.use('/api/decks', deckRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/auth', authRoutes)
  app.use('/api/admin', adminRoutes)
}
