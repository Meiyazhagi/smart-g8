import jwt from "jsonwebtoken"

export function verifyToken(token: string | null) {
  if (!token) return null

  try {
    return jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
  } catch (error) {
    return null
  }
}
