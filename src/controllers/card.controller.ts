import { Request, Response } from 'express'
import * as CardService from '../domain/services/card.service'
import { CardInterface } from '../domain/interfaces/card.interface'

export const createCardController = async (req: Request, res: Response) => {
  try {
    const cardData: CardInterface = req.body
    const newCard = await CardService.createCard(cardData)
    res.status(201).json({
      message: 'Card created successfully',
      card: newCard,
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateCardController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const cardData: CardInterface = req.body
    const updatedCard = await CardService.updateCard(id, cardData)
    if (updatedCard) {
      res.status(200).json({
        message: 'Card updated successfully',
        card: updatedCard,
      })
    } else {
      res.status(404).json({ message: 'Card not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getCardByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const card = await CardService.getCardById(id)
    if (card) {
      res.status(200).json(card)
    } else {
      res.status(404).json({ message: 'Card not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getFilteredCardsController = async (req: Request, res: Response) => {
  try {
      const filters = req.query;
      const cards = await CardService.getFilteredCards(filters);
      res.status(200).json(cards);
  } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
}

export const deleteCardController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const deletedCard = await CardService.deleteCard(id)
    if (deletedCard) {
      res.status(200).json({ message: 'Card deleted successfully' })
    } else {
      res.status(404).json({ message: 'Card not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}