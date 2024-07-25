import { UserInterface } from '../../domain/interfaces/user.interface'
import User from '../../domain/models/user.model'

export const createUser = async (userData: Partial<UserInterface>): Promise<UserInterface> => {
  const user = new User(userData)
  return await user.save()
}

export const findUserByUsername = async (username: string): Promise<UserInterface | null> => {
  return await User.findOne({ username })
}

export const findUserByEmail = async (email: string): Promise<UserInterface | null> => {
  return await User.findOne({ email })
}