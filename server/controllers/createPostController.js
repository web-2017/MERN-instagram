import Post from "../models/post.js";


export const PostsController =async (req, res) => async (req, res) => {
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
}

export const createPostController = async (req, res) => {
    const {title, body, image} = req.body
    if (!title || !body || !image) return res.status(422).json({error: 'Все поля обязательны для заполнения'})

    // remove unused keys
    req.user.password = undefined
    req.user.__v = undefined

    try {
        const post = new Post({title, body, image, postedBy: req.user})
        post.save().then(() => res.json(post))
    } catch (e) {
        console.log(e)
    }
}

export const PostController =async (req, res) => {
    const posts = await Post.find({postedBy: req.user._id}).populate('postedBy', "_id name")
    res.json(posts)
}
