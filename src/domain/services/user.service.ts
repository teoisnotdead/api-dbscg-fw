import * as UserRepository from '../../infrastructure/repositories/user.repository'
import { UserInterface } from '../interfaces/user.interface'

export const getUserByUsername = async (username: string): Promise<UserInterface | null> => {
  return await UserRepository.findUserByUsername(username)
}

export const updateUser = async (id: string, userData: Partial<UserInterface>): Promise<UserInterface | null> => {
  return await UserRepository.updateUser(id, userData)
}

export const deleteUser = async (id: string): Promise<UserInterface | null> => {
  return await UserRepository.deleteUser(id)
}

export const getUsers = async (filters: any): Promise<UserInterface[]> => {
  return await UserRepository.findUsers(filters);
}

export const getUserByFilters = async (filters: Partial<UserInterface>): Promise<UserInterface | null> => {
  const users = await UserRepository.findUsers(filters)
  return users.length > 0 ? users[0] : null
}

export const updateUserRole = async (id: string, role: 'basic' | 'admin'): Promise<UserInterface | null> => {
  return await UserRepository.updateUser(id, { role })
}