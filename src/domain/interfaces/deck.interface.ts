import { Document } from 'mongoose'
import { CardInterface } from './card.interface'

export interface DeckCard {
  card: CardInterface
  quantity: number
}

export interface DeckInterface extends Document {
  deck_name: string
  view_count: number
  deck_type: string
  deck_subtype: string
  deck_format: string
  deck_game_type: string
  deck_leader: CardInterface
  user: {
    username: string
    nametag?: string
  }
  cards: DeckCard[]
  createdAt?: Date
  updatedAt?: Date
}
