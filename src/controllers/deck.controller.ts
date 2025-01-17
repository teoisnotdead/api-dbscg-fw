import { Request, Response } from 'express'
import * as DeckService from '../domain/services/deck.service'
import { DeckInterface } from '../domain/interfaces/deck.interface'

export const createDeckController = async (req: Request, res: Response) => {
  try {
    const deckData: DeckInterface = req.body
    const newDeck = await DeckService.createDeck(deckData)
    res.status(201).json({
      message: 'Deck created successfully',
      deck: newDeck,
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateDeckController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const deckData: DeckInterface = req.body
    const updatedDeck = await DeckService.updateDeck(id, deckData)
    if (updatedDeck) {
      res.status(200).json({
        message: 'Deck updated successfully',
        deck: updatedDeck,
      })
    } else {
      res.status(404).json({ message: 'Deck not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getDeckByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const deck = await DeckService.getDeckById(id)
    if (deck) {
      res.status(200).json(deck)
    } else {
      res.status(404).json({ message: 'Deck not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getFilteredDecksController = async (req: Request, res: Response) => {
  try {
    const filters = req.query
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const result = await DeckService.getFilteredDecks(filters, page, limit)
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteDeckController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const deletedDeck = await DeckService.deleteDeck(id)
    if (deletedDeck) {
      res.status(200).json({ message: 'Deck deleted successfully' })
    } else {
      res.status(404).json({ message: 'Deck not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const incrementViewCountController = async (req: Request, res: Response) => {
  try {
    const deckId = req.params.id
    const updatedDeck = await DeckService.incrementViewCount(deckId)
    if (updatedDeck) {
      res.status(200).json({
        message: 'View count incremented successfully',
        deck: updatedDeck,
      })
    } else {
      res.status(404).json({ message: 'Deck not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const cloneDeckController = async (req: Request, res: Response) => {
  try {
    const { id, newDeckName, username } = req.body
    const clonedDeck = await DeckService.cloneDeck(id, newDeckName, username)
    if (!clonedDeck) {
      return res.status(404).json({ message: 'Deck not found' })
    }
    res.status(201).json({
      message: 'Deck cloned successfully',
      deck: clonedDeck,
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const exportDeckController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const token = await DeckService.exportDeck(id)
    if (token) {
      res.status(200).json({ token })
    } else {
      res.status(404).json({ message: 'Deck not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const importDeckController = async (req: Request, res: Response) => {
  try {
    const { token, newDeckName, username } = req.body
    const deck = await DeckService.importDeck(token, newDeckName, username)
    if (deck) {
      res.status(201).json(deck)
    } else {
      res.status(400).json({ message: 'Invalid token or deck data' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
