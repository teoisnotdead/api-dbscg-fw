import mongoose from 'mongoose'
import { config } from '../../config'

const mongoUri = config.DB_URI

if (mongoUri) {
  mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))
} else {
  console.warn('MongoDB URI not provided. Skipping MongoDB connection.')
}