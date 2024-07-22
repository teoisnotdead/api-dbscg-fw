import { Schema, model } from 'mongoose'
import { CardInterface } from '../interfaces/card.interface'

const skillSchema = new Schema(
  {
    type: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
)

const cardSchema = new Schema<CardInterface>(
  {
    card_color: { type: String, required: true },
    card_number: { type: String, required: true },
    card_energy_cost: { type: Number },
    card_front_name: { type: String, required: true },
    card_front_power: { type: String, required: true },
    card_front_trait: { type: String, required: true },
    card_back_name: { type: String },
    card_back_power: { type: String },
    card_back_trait: { type: String },
    card_front_skills: [skillSchema],
    card_back_skills: [skillSchema],
    card_rarity: { type: String, required: true },
    card_type: { type: String, required: true },
    card_combo_power: { type: String },
    card_series: { type: String, required: true },
    is_banned: { type: Boolean, default: false },
    is_limited: { type: Boolean, default: false },
    has_errata: { type: Boolean, default: false },
    limited_to: { type: Number }, // Cantidad de copias permitidas, investigar si es requerido
    errata_back: { type: String },
    errata_front: { type: String },
    digital_card_code: { type: String, required: true},
    variant_of: { type: Number },
    image_front: { type: String, required: true },
    image_back: { type: String },
    view_count: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Card = model<CardInterface>('Card', cardSchema)
export { cardSchema } 
