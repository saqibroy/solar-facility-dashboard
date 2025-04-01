import jwt from 'jsonwebtoken'
import { User, IUser } from '../models/User.js'
import { Request, Response, NextFunction } from 'express'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES_IN = '1d'

export interface AuthTokenPayload {
  userId: string
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Token missing' })
  }

  try {
    const payload = verifyToken(token)
    const user = await User.findById(payload.userId)

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    // Attach user to the request for later use if needed
    ;(req as any).user = user
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): AuthTokenPayload {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload
}

export async function getUserFromToken(req: Request): Promise<IUser | null> {
  const authHeader = req.headers.authorization
  if (!authHeader) return null

  const token = authHeader.split(' ')[1]
  if (!token) return null

  try {
    const payload = verifyToken(token)
    return await User.findById(payload.userId)
  } catch (error) {
    return null
  }
}
