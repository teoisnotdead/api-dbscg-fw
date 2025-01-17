import { DeckInterface } from '../interfaces/deck.interface'
import * as DeckRepository from '../../infrastructure/repositories/deck.repository'

export const createDeck = async (deckData: DeckInterface): Promise<DeckInterface> => {
  return await DeckRepository.createDeck(deckData)
}

export const updateDeck = async (id: string, deckData: DeckInterface): Promise<DeckInterface | null> => {
  return await DeckRepository.updateDeck(id, deckData)
}

export const getDeckById = async (id: string): Promise<DeckInterface | null> => {
  return await DeckRepository.getDeckById(id)
}

export const getFilteredDecks = async (filters: any, page: number, limit: number): Promise<{ decks: DeckInterface[], pagination: any }> => {
  return await DeckRepository.getFilteredDecks(filters, page, limit)
}

export const deleteDeck = async (id: string): Promise<DeckInterface | null> => {
  return await DeckRepository.deleteDeck(id)
}

export const incrementViewCount = async (deckId: string): Promise<DeckInterface | null> => {
  return await DeckRepository.incrementViewCount(deckId)
}

export const cloneDeck = async (id: string, newDeckName: string, username: string): Promise<DeckInterface | null> => {
  return await DeckRepository.cloneDeck(id, newDeckName, username)
}

export const exportDeck = async (deckId: string): Promise<string | null> => {
  return await DeckRepository.exportDeck(deckId)
}

export const importDeck = async (token: string, newDeckName: string, username: string): Promise<DeckInterface | null> => {
  return await DeckRepository.importDeck(token, newDeckName, username)
}
