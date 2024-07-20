import { CardInterface } from '../interfaces/card.interface'
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

export const getAllCards = async (): Promise<CardInterface[]> => {
  return await CardRepository.getAllCards()
}

export const deleteCard = async (id: string): Promise<CardInterface | null> => {
  return await CardRepository.deleteCard(id)
}
