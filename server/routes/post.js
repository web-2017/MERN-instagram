import express from "express";
import Post from "../models/post.js";
import requireLogin from "../middleware/requireLogin.js";

const router = express.Router()

router
    .get('/allpost', async (req, res) => {
        /**
         *  Получили все posts, postedBy
         *  postedBy - сортировка по полю,
         *  select - какие поля будут видны
         */
        try {
            const posts = await Post.find().populate('postedBy', "_id name")
            res.json(posts)
        } catch (e) {
            console.log(e)
        }
    })
    .post('/createpost', requireLogin, (req, res) => {
        const {title, body} = req.body
        if (!title || !body) return res.status(422).json({error: 'Все поля обязательны для заполнения'})

        // remove keys
        req.user.password = undefined
        req.user.__v = undefined

        try {
            const post = new Post({title, body, postedBy: req.user})
            post.save().then(() => res.json(post))
        } catch (e) {
            console.log(e)
        }
    })
    .get('/mypost', requireLogin, async (req, res) => {
        const posts = await Post.find({postedBy: req.user._id}).populate('postedBy', "_id name")
        res.json(posts)
    })

export default router