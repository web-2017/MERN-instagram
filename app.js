import express from 'express'
const app = express()
import mongoose from 'mongoose'
import path from 'path'
const __dirname = path.resolve()
import colors from 'colors'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'


import auth from "./routes/auth.js";
import post from "./routes/post.js";
import user from "./routes/user.js";
import {MONGO_URI} from './config/keys.js'

const port = process.env.PORT || 5000

// app.use(express.json())
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use(morgan("dev"));

app.use(auth)
app.use(post)
app.use(user)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('front/build'))
    app.get('*', (req, res) => {
        console.log(11)

        res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'))
    })
}

// Connection to Mongodb
try {
    const connect = await mongoose.connect(MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    await console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline)

} catch (error) {
    console.log(`Error: ${error}`.red.underline.bold)
    process.exit(1)
}

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`.yellow.bold))



