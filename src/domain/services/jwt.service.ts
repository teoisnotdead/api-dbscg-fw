import jwt from 'jsonwebtoken'
import { config } from '../../config'

const JWT_SECRET = config.JWT_SECRET as string

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET)
}
