import express from "express";
import Post from "../models/post.js";
import requireLogin from "../middleware/requireLogin.js";

const router = express.Router()

router
    .post('/createpost', requireLogin, (req, res) => {
        const {title, body} = req.body
        if (!title || !body) return res.status(422).json({error: 'Все поля обязательны для заполнения'})

        req.user.password = undefined
        req.user.__v = undefined

        const post = new Post({title, body, postedBy: req.user})
        post.save()
        res.json(post)

    })

export default router