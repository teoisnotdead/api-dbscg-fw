import { Schema, model } from 'mongoose'
import { DeckInterface, DeckCard } from '../interfaces/deck.interface'
import { cardSchema } from './card.model'

const deckCardSchema = new Schema<DeckCard>({
  card: { type: cardSchema, required: true },
  quantity: { type: Number, required: true, min: 1 }
})

const deckSchema = new Schema<DeckInterface>({
  deck_name: { type: String, required: true },
  view_count: { type: Number, default: 0 },
  deck_type: { type: String, required: true },
  deck_subtype: { type: String, required: true },
  deck_format: { type: String, required: true },
  deck_game_type: { type: String, required: true },
  deck_leader: { type: cardSchema, required: true },
  user: {
    username: { type: String, required: true },
    nametag: { type: String }
  },
  cards: { type: [deckCardSchema], required: true },
}, { timestamps: true })

export const Deck = model<DeckInterface>('Deck', deckSchema)
