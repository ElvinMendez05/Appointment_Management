import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '24h';

interface JwtPayload {
  userId: string;
  businessId: string;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
}

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

