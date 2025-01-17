import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
}

export default connectDb