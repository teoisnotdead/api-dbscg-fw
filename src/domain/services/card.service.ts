import { CardInterface } from '../interfaces/card.interface'
import { Card } from '../models/card.model'
import * as CardRepository from '../../infrastructure/repositories/card.repository'

export const createCard = async (cardData: CardInterface): Promise<CardInterface> => {
  return await CardRepository.createCard(cardData)
}

export const updateCard = async (id: string, cardData: CardInterface): Promise<CardInterface | null> => {
  return await CardRepository.updateCard(id, cardData)
}

export const getCardById = async (id: string): Promise<CardInterface | null> => {
  return await CardRepository.getCardById(id)
}

export const getFilteredCards = async (filters: any): Promise<CardInterface[]> => {
  return await CardRepository.getFilteredCards(filters)
}

export const deleteCard = async (id: string): Promise<CardInterface | null> => {
  return await CardRepository.deleteCard(id)
}

export const getCardByNumber = async (card_number: string): Promise<CardInterface | null> => {
  return await Card.findOne({ card_number })
}

export const incrementViewCount = async (cardNumber: string): Promise<CardInterface | null> => {
  return await Card.findOneAndUpdate(
    { card_number: cardNumber },
    { $inc: { view_count: 1 } },
    { new: true }
  )
}
