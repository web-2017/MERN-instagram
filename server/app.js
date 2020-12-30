import express from 'express'

const app = express()
import mongoose from 'mongoose'
import {PORT, MONGO_URI} from './keys.js'
import colors from 'colors'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import auth from "./routes/auth.js";

// import User from "./models/user.js";


// app.use(express.json())
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use(morgan("dev"));


const port = PORT || 5000

// Auth
app.use(auth)

// Connection to Mongodb
try {
    const connect = await mongoose.connect(MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline)
} catch (error) {
    console.log(`Error: ${error}`.red.underline.bold)
    process.exit(1)
}

app.listen(PORT, () => console.log(`Server running on port http://localhost:${port}`.yellow.bold))



