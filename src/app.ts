import express from 'express'
import './domain/interfaces/auth.interface'
import './infrastructure/database/mongoose'
import bodyParser from 'body-parser'
import { cardRoutes,
  deckRoutes,
  userRoutes,
  authRoutes,
  adminRoutes
} from './routes'
import { config } from './config'



const app = express()
const port = config.PORT

// // Middleware para la poblacion de datos
// app.use(bodyParser.json({ limit: '50mb' })) // Aumentar el límite de tamaño de carga útil
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })) // Aumentar el límite para datos codificados en URL

app.use(express.json())
app.get('/', (req, res) => {
  res.send('<h1>DBSCG FW Server!!!</h1>')
})
app.use('/api/cards', cardRoutes)
app.use('/api/decks', deckRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})