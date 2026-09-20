import { CONFIG } from '../config/config.js'
import jwt from 'jsonwebtoken'

export function tokenGenerator (id) {
  const token = jwt.sign(
    {
      id:id
    },
    CONFIG.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  )

  return  token
}
