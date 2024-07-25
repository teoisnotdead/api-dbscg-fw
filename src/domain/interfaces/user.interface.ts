import { Document } from 'mongoose'

export interface UserInterface extends Document {
  name: string
  username: string
  email: string
  password: string
  nametag?: string
  role: 'basic' | 'admin'
  subscription: 'free' | 'premium'
  createdAt?: Date
  updatedAt?: Date
}