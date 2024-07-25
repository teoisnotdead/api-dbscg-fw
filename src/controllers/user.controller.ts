import { Request, Response } from 'express'
import * as UserService from '../domain/services/user.service'
import { AuthRequest } from '../domain/interfaces/auth.interface'

export const getUserController = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserService.getUserByFilters({ username: req.user!.username })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userData = req.body
    const updatedUser = await UserService.updateUser(id, userData)
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(updatedUser)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedUser = await UserService.deleteUser(id)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(deletedUser)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getUsersController = async (req: AuthRequest, res: Response) => {
  try {
    const filters = req.query
    const users = await UserService.getUsers(filters)
    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
