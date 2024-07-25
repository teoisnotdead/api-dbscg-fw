import mongoose, { Schema, Document } from 'mongoose'
import { UserInterface } from '../interfaces/user.interface'

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nametag: { type: String },
  role: { type: String, enum: ['basic', 'admin'], default: 'basic' },
  subscription: { type: String, enum: ['free', 'premium'], default: 'free' },
}, {
  timestamps: true
})

const User = mongoose.model<UserInterface>('User', UserSchema)

export default User