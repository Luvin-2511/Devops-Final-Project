import mongoose from 'mongoose'
import { CONFIG } from './config.js';

export async function connectToDB () {
  try {
    await mongoose.connect(CONFIG.MONGO_URI)
    console.log(`Server connected to DB successfully !`);
  } catch (err) {
    console.log(`Error occured while connecting to mongoDb Server -> ${err}`)
  }
}
