import express from 'express'
import './infrastructure/database/mongoose'
import { cardRoutes } from './routes/card.routes'
import { deckRoutes } from './routes/deck.routes'

const app = express()
const port = process.env.PORT || 3000
const jwtSecret = process.env.JWT_SECRET

app.use(express.json())
app.get('/', (req, res) => {
  res.send('<h1>DBSCG FW Server!!!</h1>')
})
app.use('/api/cards', cardRoutes)
app.use('/api/decks', deckRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})