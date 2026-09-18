import mongoose from 'mongoose'

const userShcema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required !'],
    trim: true,
    unique: [true, 'Email should be unique !']
  },
  username: {
    type: String,
    required: [true, 'Username is required !'],
    unique: [true, 'Email should be unique !']
  },
  password: {
    type: String,
    required: [true, 'Password is required !'],
    select: false
  },
  profilePic: {
    type: String
  }
})

const userModel = mongoose.model('user', userShcema)

export default userModel
