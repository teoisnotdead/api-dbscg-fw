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

export const getAllCards = async (): Promise<CardInterface[]> => {
  return await Card.find()
}

export const deleteCard = async (id: string): Promise<CardInterface | null> => {
  return await Card.findByIdAndDelete(id)
}