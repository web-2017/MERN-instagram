import dotenv from 'dotenv'

dotenv.config()

export const MONGO_URI = process.env.MONGO_DB;
export const PORT = process.env.PORT;
export const JWT_TOKEN = process.env.JWT_SECRET;