import jwt from 'jsonwebtoken'
import {JWT_TOKEN} from "../keys.js";
import mongoose from "mongoose";

const User = mongoose.model("User")

export default async (req, res, next) => {
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if (!authorization) {
        return res.status(401).json({error: "you must be logged in"})
    }
    const token = authorization.replace("Bearer ", "")

    try {
        const verified = jwt.verify(token, JWT_TOKEN);

        if (!verified) return res.status(401).json({error: "you must be logged in"})

        const user = await User.findById(verified.id);

        req.user = user
        next()

    } catch (e) {
        console.error(e)
    }
}