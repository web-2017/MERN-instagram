import Post from "../models/post.js";

export const allPostsController = async (req, res) => {
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

export const myPosts = async (req, res) => {
    const posts = await Post.find({postedBy: req.user._id}).populate('postedBy', "_id")
    res.json(posts)
}

export const likePostController = async (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {$push: {likes: req.user._id}}, {new: true})
        .exec((err, result) => {
            if (err) return res.status(422).json({error: err})
            else return res.json(result)
        })
}

export const unLikePostController = async (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {likes: req.user._id}
    }, {
        new: true
    }).exec((err, result) => {
        if (err) return res.status(422).json({error: err})
        else return res.json(result)
    })
}
export const commentPostController = async (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment}
    }, {
        new: true
    })
        .populate('comments.postedBy', '_id name')
        .exec((err, result) => {
            if (err) return res.status(422).json({error: err})
            else return res.json(result)
        })
}

