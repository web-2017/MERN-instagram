import express from 'express'

const app = express()
import mongoose from 'mongoose'
import colors from 'colors'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import auth from "./routes/auth.js";
import post from "./routes/post.js";
import {PORT, MONGO_URI} from './keys.js'

// app.use(express.json())
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use(morgan("dev"));
const port = PORT || 5000

app.use(auth)
app.use(post)

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

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`.yellow.bold))



