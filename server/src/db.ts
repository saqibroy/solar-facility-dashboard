import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('MongoDB Connected')
  } catch (err) {
    console.error('MongoDB Connection Error:', err)
    process.exit(1)
  }
}
