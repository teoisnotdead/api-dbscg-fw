import { Request, Response } from 'express'
import * as UserService from '../domain/services/user.service'
import { AuthRequest } from '../domain/interfaces/auth.interface'

export const registerController = async (req: Request, res: Response) => {
  try {
    const userData = req.body

    const existingUser = await UserService.getUserByUsername(userData.username)
    const existingEmail = await UserService.getUserByEmail(userData.email)
    
    if (existingUser || existingEmail) return res.status(400).json({ message: 'User with this username or email already exists' })
    
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
    const user = await UserService.getUserByUsername(req.user!.username)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
