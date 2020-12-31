import express from "express";
import Post from "../models/post.js";
import requireLogin from "../middleware/requireLogin.js";

const router = express.Router()

router
    .post('/createpost', requireLogin, (req, res) => {
        const {title, body} = req.body
        if (!title || !body) return res.status(422).json({error: 'Все поля обязательны для заполнения'})
        console.log(1, req.user)
        res.send('ok')
        // const post = new Post(req.body)
    })

export default router