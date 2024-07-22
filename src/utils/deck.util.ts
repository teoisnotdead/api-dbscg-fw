import { DeckInterface } from '../domain/interfaces/deck.interface'

export const deckToPlainObject = (deck: DeckInterface): any => {
  const { _id, __v, createdAt, updatedAt, ...plainDeck } = deck.toObject()
  return plainDeck
}
