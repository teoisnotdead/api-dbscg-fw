import { Deck } from '../../domain/models/deck.model'
import { DeckInterface } from '../../domain/interfaces/deck.interface'

export const createDeck = async (deckData: DeckInterface): Promise<DeckInterface> => {
  const deck = new Deck(deckData)
  return await deck.save()
}

export const updateDeck = async (id: string, deckData: Partial<DeckInterface>): Promise<DeckInterface | null> => {
  return await Deck.findByIdAndUpdate(id, deckData, { new: true })
}

export const getDeckById = async (id: string): Promise<DeckInterface | null> => {
  return await Deck.findById(id)
}

export const deleteDeck = async (id: string): Promise<DeckInterface | null> => {
  return await Deck.findByIdAndDelete(id)
}

export const getFilteredDecks = async (filters: any): Promise<DeckInterface[]> => {
  const query: any = {}

  if (filters.deck_name) query.deck_name = new RegExp(filters.deck_name, 'i')
  if (filters.deck_type) query.deck_type = filters.deck_type
  if (filters.deck_subtype) query.deck_subtype = filters.deck_subtype
  if (filters.deck_format) query.deck_format = filters.deck_format
  if (filters.deck_game_type) query.deck_game_type = filters.deck_game_type
  if (filters.username) query['user.username'] = new RegExp(filters.username, 'i')

  return await Deck.find(query)
}

export const incrementViewCount = async (deckId: string): Promise<DeckInterface | null> => {
  return await Deck.findByIdAndUpdate(
    deckId,
    { $inc: { view_count: 1 } },
    { new: true }
  )
}
