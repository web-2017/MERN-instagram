import User from "../models/user.js";
import Post from "../models/post.js";

export default async (req, res) => {
    User.findOne({_id: req.params.id})
        .select('-password')
        .then(user => {
            Post.find({postedBy: req.params.id})
                .populate('postedBy', '_id name')
                .exec((err, posts) => {
                    if (err) return res.status(422).json({error: err})
                    res.status(200).json({user, posts})
                })
        }).catch((error) => res.status(404).json({error: 'User not found'}))
}