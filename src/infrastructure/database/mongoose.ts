import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongoUri: string = process.env.MONGO_URI as string


if (mongoUri) {
  mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))
} else {
  console.warn('MongoDB URI not provided. Skipping MongoDB connection.')
}