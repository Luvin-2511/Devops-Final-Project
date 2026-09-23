import jwt from 'jsonwebtoken'
import { CONFIG } from '../config/config.js'
/**
 * @route Middleware
 * @description Checks whether user is authenticated or not
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function authUserMiddleware (req, res, next) {
  try {
    const { token } = req.cookies
    if (!token) {
      return next({
        status: 403,
        message: 'Unauthorized User'
      })
    }

    const decoded = jwt.verify(token, CONFIG.JWT_SECRET)
    if (!decoded) {
      return next({
        status: 403,
        message: 'Unauthorized User'
      })
    }

    req.user = decoded
    next()
  } catch (err) {
    next({
      status: 401,
      message: 'Invalid or expired token'
    })
  }
}
