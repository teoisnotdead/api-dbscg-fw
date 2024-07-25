import { Request, Response } from 'express'
import * as UserService from '../domain/services/user.service'
import { AuthRequest } from '../domain/interfaces/auth.interface'

export const registerController = async (req: Request, res: Response) => {
  try {
    const userData = req.body

    const existingUserByUsername = await UserService.getUserByFilters({ username: userData.username })
    const existingUserByEmail = await UserService.getUserByFilters({ email: userData.email })
    
    if (existingUserByUsername || existingUserByEmail) return res.status(400).json({ message: 'User with this username or email already exists' })

    const user = await UserService.registerUser(userData)

    const token = UserService.generateToken(user)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        nametag: user.nametag,
        decks: user.decks,
        favoriteCards: user.favoriteCards,
        subscription: user.subscription,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const result = await UserService.loginUser(username, password)
    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

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
