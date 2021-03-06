import User from '../models/user.js';
import Post from '../models/post.js';

export const userController = async (req, res) => {
    User.findOne({_id: req.params.id})
        .select('-password')
        .then((user) => {
            Post.find({postedBy: req.params.id})
                .populate('postedBy', '_id name')
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({error: err});
                    }
                    res.json({user, posts});
                });
        })
        .catch((err) => {
            return res.status(404).json({error: 'User not found: ' + err});
        });
};

// set profile avatar picture
export const userUpdateProfileImage = async (req, res) => {
    try {
        User.findByIdAndUpdate(
            req.user._id,
            {$set: {image: req.body.image}},
            {new: true},
            (err, result) => {
                if (err) {
                    return res.status(422).json({error: 'pic cannot post'});
                }
                res.json(result);
            }
        );
    } catch (e) {
        console.log(e);
    }
};

export const followUserController = async (req, res) => {
    User.findByIdAndUpdate(
        req.body.followId,
        {
            $push: {followers: req.user._id},
        },
        {
            new: true,
        },
        (err, result) => {
            if (err) {
                return res.status(422).json({error: err});
            }
            User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: {following: req.body.followId},
                },
                {new: true}
            )
                .select('-password')
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    return res.status(422).json({error: err});
                });
        }
    );
};

export const unFollowUserController = async (req, res) => {
    User.findByIdAndUpdate(
        req.body.unFollowId,
        {
            $pull: {followers: req.user._id},
        },
        {
            new: true,
        },
        (err, result) => {
            if (err) {
                return res.status(422).json({error: err});
            }
            User.findByIdAndUpdate(
                req.user._id,
                {
                    $pull: {following: req.body.unFollowId},
                },
                {new: true}
            )
                .select('-password')
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    return res.status(422).json({error: err});
                });
        }
    );
};

// search query
export const searchUsersHandler = async (req, res) => {
    let userPattern = new RegExp(`^${req.body.query}`)
    try {
        const user = await User.find({email: {$regex: userPattern}})
            .select('_id email')
        await res.json({user})

    } catch (e) {
        console.error(e)
    }
}
