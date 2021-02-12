import dotenv from 'dotenv'
import path from 'path'

const __dirname = path.resolve()
dotenv.config({path:
        process.env.NODE_ENV === 'production'
            ?
            __dirname + '/config/production.env'
            :
            __dirname + '/config/development.env'})

export const MONGO_URI = await process.env.MONGO_DB;
export const JWT_SECRET = await process.env.JWT_SECRET;
