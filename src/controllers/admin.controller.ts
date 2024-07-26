import { Request, Response } from 'express'
import * as AuthService from '../domain/services/auth.service'
import * as UserService from '../domain/services/user.service'
import { AuthRequest } from '../domain/interfaces/auth.interface'

export const createAdminController = async (req: AuthRequest, res: Response) => {
  try {
    const userData = req.body
    userData.role = 'admin'
    userData.subscription = 'premium'
    const user = await AuthService.registerUser(userData)
    res.status(201).json({ message: 'Admin created successfully', user })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUserRoleController = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { role } = req.body
    if (role !== 'basic' && role !== 'admin') {
      return res.status(400).json({ message: 'Invalid role' })
    }
    const updatedUser = await UserService.updateUserRole(id, role)
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User role updated successfully', user: updatedUser })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
