import { CardInterface } from '../../domain/interfaces/card.interface'
import { DeckInterface } from '../../domain/interfaces/deck.interface'
import { Deck } from '../../domain/models/deck.model'
import { generateToken, verifyToken } from '../../domain/services/jwt.service'
import * as CardService from '../../domain/services/card.service'
import { deckToPlainObject } from '../../utils/deck.util'

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

export const getFilteredDecks = async (filters: any, page: number, limit: number): Promise<{ decks: DeckInterface[], pagination: any }> => {
  const query: any = {}

  if (filters.deck_name) query.deck_name = new RegExp(filters.deck_name, 'i')
  if (filters.deck_type) query.deck_type = filters.deck_type
  if (filters.deck_subtype) query.deck_subtype = filters.deck_subtype
  if (filters.deck_format) query.deck_format = filters.deck_format
  if (filters.deck_game_type) query.deck_game_type = filters.deck_game_type
  if (filters.username) query['user.username'] = new RegExp(filters.username, 'i')
  if (filters.deck_leader) query['deck_leader.card_front_name'] = new RegExp(filters.deck_leader, 'i')
  if (filters.card_number) query['cards.card.card_number'] = new RegExp(filters.card_number, 'i')
  if (filters.deck_color) query['deck_leader.card_color'] = filters.deck_color

  const decks = await Deck.find(query)
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await Deck.countDocuments(query)

  return {
    decks,
    pagination: {
      total,
      page,
      limit,
    },
  }
}

export const incrementViewCount = async (deckId: string): Promise<DeckInterface | null> => {
  return await Deck.findByIdAndUpdate(
    deckId,
    { $inc: { view_count: 1 } },
    { new: true }
  )
}

export const cloneDeck = async (id: string, newDeckName: string, username: string): Promise<DeckInterface | null> => {
  const deck = await Deck.findById(id)
  if (!deck) return null

  const clonedDeck = new Deck({
    deck_name: newDeckName,
    view_count: 0,
    deck_type: deck.deck_type,
    deck_subtype: deck.deck_subtype,
    deck_format: deck.deck_format,
    deck_game_type: deck.deck_game_type,
    deck_leader: deck.deck_leader,
    user: {
      username: username,
      nametag: deck.user.nametag,
    },
    cards: deck.cards,
  })

  return await clonedDeck.save()
}

export const exportDeck = async (deckId: string): Promise<string | null> => {
  const deck = await Deck.findById(deckId)
  if (!deck) {
    return null
  }

  const payload = deckToPlainObject(deck)

  return generateToken(payload)
}

export const importDeck = async (token: string, newDeckName: string, username: string): Promise<DeckInterface | null> => {
  const payload = verifyToken(token)

  const deckLeader = await CardService.getCardByNumber(payload.deck_leader.card_number)
  if (!deckLeader) {
    throw new Error(`Leader card with number ${payload.deck_leader.card_number} not found`)
  }

  const cards = await Promise.all(payload.cards.map(async (cardData: any) => {
    const card = await CardService.getCardByNumber(cardData.card_number)
    if (!card) {
      throw new Error(`Card with number ${cardData.card_number} not found`)
    }
    return {
      card: card as CardInterface,
      quantity: cardData.quantity,
    }
  }))

  const importedDeckData = {
    deck_name: newDeckName,
    view_count: 0,
    deck_type: payload.deck_type,
    deck_subtype: payload.deck_subtype,
    deck_format: payload.deck_format,
    deck_game_type: payload.deck_game_type,
    deck_leader: {
      ...deckLeader.toObject(),
      card_number: payload.deck_leader.card_number,
      image_front: payload.deck_leader.image_front,
      image_back: payload.deck_leader.image_back,
    } as CardInterface,
    user: {
      username,
      nametag: payload.user.nametag,
    },
    cards,
  }

  const importedDeck = new Deck(importedDeckData)
  return await importedDeck.save()
}