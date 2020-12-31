import dotenv from 'dotenv'

dotenv.config()

export const MONGO_URI = process.env.MONGO_DB,
    PORT = process.env.PORT,
    JWT_TOKEN = process.env.JWT_SECRET

