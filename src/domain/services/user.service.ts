import * as UserRepository from '../../infrastructure/repositories/user.repository'
import { UserInterface } from '../interfaces/user.interface'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../../config'

const JWT_SECRET = config.JWT_SECRET as string

export const registerUser = async (userData: Partial<UserInterface>): Promise<UserInterface> => {
  const hashedPassword = await bcrypt.hash(userData.password!, 10)
  userData.password = hashedPassword
  const user = await UserRepository.createUser(userData)
  return user
}

export const loginUser = async (username: string, password: string): Promise<{ token: string, user: UserInterface } | null> => {
  const user = await UserRepository.findUserByUsername(username)
  if (!user) return null

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) return null

  const token = generateToken(user)
  return { token, user }
}

export const getUserByUsername = async (username: string): Promise<UserInterface | null> => {
  return await UserRepository.findUserByUsername(username)
}

export const generateToken = (user: UserInterface): string => {
  return jwt.sign(
    { id: user._id, username: user.username, subscription: user.subscription },
    JWT_SECRET,
    { expiresIn: '1h' }
  )
}

export const deleteUser = async (id: string): Promise<UserInterface | null> => {
  return await UserRepository.deleteUser(id)
}

export const updateUser = async (id: string, userData: Partial<UserInterface>): Promise<UserInterface | null> => {
  return await UserRepository.updateUser(id, userData)
}

export const getUsers = async (filters: any): Promise<UserInterface[]> => {
  return await UserRepository.findUsers(filters);
}

export const getUserByFilters = async (filters: Partial<UserInterface>): Promise<UserInterface | null> => {
  const users = await UserRepository.findUsers(filters)
  return users.length > 0 ? users[0] : null
}