import express from 'express'
import morgan from 'morgan'
import { connectToDB } from './config/db.js'
import authRouter from './routes/auth.route.js'
import { errorHandler } from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'

const app = express()

//MiddleWares
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

//Database Function
connectToDB()

//Health Check API
app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Server working perfectly !',
    success: true
  })
})

// Routes
app.use('/api/auth', authRouter)

//Error Handler Middleware
app.use(errorHandler)

export default app
