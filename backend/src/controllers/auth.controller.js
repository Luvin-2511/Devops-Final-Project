import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { tokenGenerator } from '../utils/tokenGenerator.js'

/**
 * @route POST api/auth/register
 * @description Registers an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function registerController (req, res, next) {
  try {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
      return next({
        status: 400,
        message: 'All fields are required to proceed !'
      })
    }

    const isUserExists = await userModel.findOne({
      $or: [{ email }, { username }]
    })

    if (isUserExists) {
      return next({
        status: 403,
        message: 'Unable to create account with these credentials !'
      })
    }
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const isValidPass = passRegex.test(password)

    if (!isValidPass) {
      return next({
        status: 400,
        message:
          'Password should contain 8+ characters, 1 lowercase, 1 uppercase, 1 number & 1 special character'
      })
    }
    const hashedPass = await bcrypt.hash(password, 10)
    const user = await userModel.create({
      email,
      username,
      password: hashedPass
    })

    const token = tokenGenerator(user._id)
    res.cookie('token', token)

    return res.status(201).json({
      success: true,
      message: 'Registered successfully !'
    })
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    })
  }
}

/**
 * @route POST api/auth/login
 * @description Logins an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function loginController (req, res, next) {
  try {
    const { email, username, password } = req.body
    if ((!email && !username) || !password) {
      return next({
        status: 400,
        message: 'Fill all fields to proceed !'
      })
    }

    const user = await userModel
      .findOne({
        $or: [{ email }, { username }]
      })
      .select('+password')

    if (!user) {
      return next({
        status: 400,
        message: 'Something went wrong make sure credentials are correct !'
      })
    }

    const isValidPass = await bcrypt.compare(password, user.password)
    if (!isValidPass) {
      return next({
        status: 400,
        message: 'Something went wrong make sure credentials are correct !'
      })
    }

    const token = tokenGenerator(user._id)
    res.cookie('token', token)

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully !'
    })
  } catch (error) {
    next({
      status: 500,
      message: error
    })
  }
}

/**
 * @route POST api/auth/logout
 * @description Logs out an User
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function logoutController (req, res, next) {
  try {
    res.clearCookie('token')
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully !'
    })
  } catch (err) {
    next({
      status: 500,
      message: 'Invalid Server error !'
    })
  }
}

/**
 * @route POST api/auth/me
 * @description Gets the logged in user description
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getMeController (req, res, next) {
  try {
    const { id } = req.user

    const user = await userModel.findById(id)
    if (!user) {
      return next({
        status: 404,
        message: "User doesn't Exist !"
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Info fetched !',
      user
    })
  } catch (error) {
    next(error)
  }
}
