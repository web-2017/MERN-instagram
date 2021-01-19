import User from '../models/user.js';
import Post from '../models/post.js';

export const userController = async (req, res) => {
	User.findOne({ _id: req.params.id })
		.select('-password')
		.then((user) => {
			Post.find({ postedBy: req.params.id })
				.populate('postedBy', '_id name')
				.exec((err, posts) => {
					if (err) {
						return res.status(422).json({ error: err });
					}
					res.json({ user, posts });
				});
		})
		.catch((err) => {
			return res.status(404).json({ error: 'User not found' });
		});
};

// set profile avatar picture
export const userAvatarController = async (req, res) => {
	try {
		User.findByIdAndUpdate(
			req.user._id,
			{ $set: { avatar: req.body.avatar } },
			{ new: true },
			(err, result) => {
				if (err) {
					return res.status(422).json({ error: 'pic canot post' });
				}
				res.json(result);
			}
		);
	} catch (e) {
		console.log(e);
	}
};
