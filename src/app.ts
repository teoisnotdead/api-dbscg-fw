import express from 'express'
import './domain/interfaces/auth.interface'
import './infrastructure/database/mongoose'
import { cardRoutes, deckRoutes, userRoutes, authRoutes } from './routes'
import { config } from './config'


const app = express()
const port = config.PORT

app.use(express.json())
app.get('/', (req, res) => {
  res.send('<h1>DBSCG FW Server!!!</h1>')
})
app.use('/api/cards', cardRoutes)
app.use('/api/decks', deckRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})