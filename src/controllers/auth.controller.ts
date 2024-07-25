import { Request, Response } from 'express'
import * as UserService from '../domain/services/user.service'

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const token = await UserService.loginUser(username, password)
    if (!token) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    res.status(200).json({ token })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}