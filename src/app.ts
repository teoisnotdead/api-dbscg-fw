import express, { Request, Response, NextFunction } from 'express'
import './domain/interfaces/auth.interface'
import './infrastructure/database/mongoose'
import bodyParser from 'body-parser'

import { cardRoutes,
  deckRoutes,
  userRoutes,
  authRoutes,
  adminRoutes
} from './routes'
import morganMiddleware from './middlewares/morgan.middleware'
import logger from './utils/logger'
import { config } from './config'

const app = express()
const port = config.PORT

// Middleware para la poblacion de datos
app.use(bodyParser.json({ limit: '50mb' })) // Aumentar el límite de tamaño de carga útil
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })) // Aumentar el límite para datos codificados en URL

// Middleware para logging
app.use(morganMiddleware)

app.use(express.json())
app.get('/', (req, res) => {
  res.send('<h1>DBSCG FW Server!!!</h1>')
})
app.use('/api/cards', cardRoutes)
app.use('/api/decks', deckRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

// Middleware para manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message)
  res.status(500).send('Something went wrong')
})

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})