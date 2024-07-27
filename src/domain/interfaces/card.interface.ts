import { Document } from 'mongoose'
export interface CardInterface extends Document {
  card_color: string
  card_number: string
  card_energy_cost: number
  card_front_name: string
  card_front_power: string
  card_front_trait: string
  card_back_name?: string
  card_back_power?: string
  card_back_trait?: string
  card_front_skills: Skill[]
  card_back_skills?: Skill[]
  card_rarity: string
  card_type: string
  card_combo_power?: string
  card_series: string
  is_banned?: boolean
  is_limited?: boolean
  has_errata?: boolean
  limited_to?: number
  errata_back?: string
  errata_front?: string
  digital_card_code?: string
  image_front: string
  image_back: string
  view_count: number
  createdAt?: string
  updatedAt?: string
}

interface Skill {
  type: string[]
  description: string
}
