import { DeckInterface } from '../domain/interfaces/deck.interface'

export const deckToPlainObject = (deck: DeckInterface): any => {
  const {
    deck_name,
    view_count,
    deck_type,
    deck_subtype,
    deck_format,
    deck_game_type,
    deck_leader,
    user,
    cards,
  } = deck.toObject()

  return {
    deck_name,
    view_count,
    deck_type,
    deck_subtype,
    deck_format,
    deck_game_type,
    deck_leader: {
      card_number: deck_leader.card_number,
      image_front: deck_leader.image_front,
      image_back: deck_leader.image_back,
    },
    user: {
      username: user.username,
      nametag: user.nametag,
    },
    cards: cards.map((card: any) => ({
      card_number: card.card.card_number,
      quantity: card.quantity,
    })),
  }
}
