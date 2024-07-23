import { Card } from '../../domain/models/card.model'
import { CardInterface } from '../../domain/interfaces/card.interface'

export const createCard = async (cardData: CardInterface): Promise<CardInterface> => {
  const card = new Card(cardData)
  return await card.save()
}

export const updateCard = async (id: string, cardData: CardInterface): Promise<CardInterface | null> => {
  return await Card.findByIdAndUpdate(id, cardData, { new: true })
}

export const getCardById = async (id: string): Promise<CardInterface | null> => {
  return await Card.findById(id)
}

export const getFilteredCards = async (filters: any, page: number, limit: number): Promise<{ cards: CardInterface[], total: number }> => {
  const query: any = {}

  if (filters.card_color) query.card_color = filters.card_color
  if (filters.card_energy_cost) query.card_energy_cost = filters.card_energy_cost
  if (filters.card_front_power) query.card_front_power = filters.card_front_power
  if (filters.card_type) query.card_type = filters.card_type
  if (filters.card_rarity) query.card_rarity = filters.card_rarity
  if (filters.card_front_name) query.card_front_name = new RegExp(filters.card_front_name, 'i')
  if (filters.card_front_trait) query.card_front_trait = filters.card_front_trait
  if (filters.card_series) query.card_series = filters.card_series
  if (filters.card_front_skills) query['card_front_skills.type'] = { $in: filters.card_front_skills }

  const total = await Card.countDocuments(query)
  const cards = await Card.find(query)
    .skip((page - 1) * limit)
    .limit(limit)

  return { cards, total }
}

export const deleteCard = async (id: string): Promise<CardInterface | null> => {
  return await Card.findByIdAndDelete(id)
}

export const incrementViewCount = async (cardNumber: string): Promise<CardInterface | null> => {
  return await Card.findOneAndUpdate(
    { card_number: cardNumber },
    { $inc: { view_count: 1 } },
    { new: true }
  )
}