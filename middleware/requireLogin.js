import jwt from 'jsonwebtoken'

import {JWT_SECRET} from '../config/keys.js'

import User from "../models/user.js";


export default async (req, res, next) => {
    const {authorization} = req.headers

    //authorization === Bearer ewefwegwrherhe
    if (!authorization) {
        return res.status(401).json({error: "you must be logged in"})
    }
    const token = authorization.replace("Bearer ", "")

    try {
        const verified = jwt.verify(token, JWT_SECRET);

        if (!verified) return res.status(401).json({error: "you must be logged in"})

        // Создали user для req.user
        const user = await User.findById(verified.id);

        req.user = user
        next()

    } catch (e) {
        console.error(e)
    }
}