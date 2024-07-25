import { UserInterface } from '../../domain/interfaces/user.interface'
import User from '../../domain/models/user.model'

export const createUser = async (userData: Partial<UserInterface>): Promise<UserInterface> => {
  const user = new User(userData)
  return await user.save()
}

export const findUserByUsername = async (username: string): Promise<UserInterface | null> => {
  return await User.findOne({ username })
}

export const deleteUser = async (id: string): Promise<UserInterface | null> => {
  return await User.findByIdAndDelete(id)
}

export const updateUser = async (id: string, userData: Partial<UserInterface>): Promise<UserInterface | null> => {
  return await User.findByIdAndUpdate(id, userData, { new: true })
}

export const findUsers = async (filters: any): Promise<UserInterface[]> => {
  const query: any = {}

  if (filters.username) query.username = new RegExp(filters.username, 'i')
  if (filters.email) query.email = new RegExp(filters.email, 'i')
  if (filters.role) query.role = filters.role
  if (filters.nametag) query.nametag = new RegExp(filters.nametag, 'i')
  if (filters.subscription) query.subscription = filters.subscription

  return await User.find(query)
}