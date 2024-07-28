import express, { Request, Response, NextFunction } from 'express'
import './domain/interfaces/auth.interface'
import './infrastructure/database/mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import { registerRoutes } from './routes'
import morganMiddleware from './middlewares/morgan.middleware'
import logger from './utils/logger'
import { config } from './config'

const app = express()
const port = config.PORT

// Configurar CORS
const corsOptions: cors.CorsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

// Middleware para la poblacion de datos
app.use(bodyParser.json({ limit: '50mb' })) // Aumentar el límite de tamaño de carga útil
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })) // Aumentar el límite para datos codificados en URL

// Middleware para logging
app.use(morganMiddleware)

app.use(express.json())

// Registrar rutas
registerRoutes(app)

app.get('/', (req, res) => {
  res.send('<h1>DBSCG FW Server!!!</h1>')
})

// Middleware para manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message)
  res.status(500).send('Something went wrong')
})

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})