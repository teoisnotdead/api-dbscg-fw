import { Request, Response } from 'express'
import * as AuthService from '../domain/services/auth.service'
import * as UserService from '../domain/services/user.service'

export const registerController = async (req: Request, res: Response) => {
  try {
    const userData = req.body

    const existingUserByUsername = await UserService.getUserByFilters({ username: userData.username })
    const existingUserByEmail = await UserService.getUserByFilters({ email: userData.email })
    
    if (existingUserByUsername || existingUserByEmail) return res.status(400).json({ message: 'User with this username or email already exists' })

    const user = await AuthService.registerUser(userData)

    const token = AuthService.generateToken(user)
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
    const result = await AuthService.loginUser(username, password)
    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
