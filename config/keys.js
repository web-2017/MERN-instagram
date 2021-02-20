import dotenv from 'dotenv'
import path from 'path'
const __dirname = path.resolve()
dotenv.config({path: __dirname + '/config/production.env'})

if(process.env.NODE_ENV==='production'){
    import('./prod.js') // prod
}else{
    import('./dev.js') // dev
}

export const MONGO_URI = await process.env.MONGO_DB;
export const JWT_SECRET = await process.env.JWT_SECRET;
export const SEND_GRID_KEY = process.env.SEND_GRID_KEY;
export const EMAIL = process.env.EMAIL;








// dotenv.config({path:
//         process.env.NODE_ENV === 'production'
//             ?
//             __dirname + '/config/production.env'
//             :
//             __dirname + '/config/development.env'})