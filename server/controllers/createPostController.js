import Post from '../models/post.js';

export const allPostsController = async (req, res) => {
	/**
	 *  Получили все posts, postedBy
	 *  postedBy - сортировка по полю,
	 *  select - какие поля будут видны
	 */
	try {
		const posts = await Post.find()
			.populate('postedBy', '_id name')
			.populate('comments.postedBy', '_id name');

		await res.json(posts);
	} catch (e) {
		console.log(e);
	}
};

export const createPostController = async (req, res) => {
	const { title, body, image } = req.body;
	if (!title || !body || !image)
		return res
			.status(422)
			.json({ error: 'Все поля обязательны для заполнения' });

	// remove unused keys
	req.user.password = undefined;
	req.user.__v = undefined;

	try {
		const post = new Post({ title, body, image, postedBy: req.user });
		post.save().then(() => res.json(post));
	} catch (e) {
		console.log(e);
	}
};

export const myPosts = async (req, res) => {
	const posts = await Post.find({ postedBy: req.user._id })
		.populate('postedBy', '_id name')
		.populate('comments.postedBy', '_id name');
	await res.json(posts);
};

export const likePostController = async (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{ $push: { likes: req.user._id } },
		{ new: true }
	)
		.populate('postedBy', '_id name')
		.populate('comments.postedBy', '_id name')
		.exec((err, result) => {
			if (err) return res.status(422).json({ error: err });
			else return res.json(result);
		});
};

export const unLikePostController = async (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{ $pull: { likes: req.user._id } },
		{ new: true }
	)
		.populate('postedBy', '_id name')
		.populate('comments.postedBy', '_id name')
		.exec((err, result) => {
			if (err) return res.status(422).json({ error: err });
			else return res.json(result);
		});
};

export const commentPostController = async (req, res) => {
	const comment = {
		text: req.body.text,
		postedBy: req.user._id,
	};
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$push: { comments: comment },
		},
		{
			new: true,
		}
	)
		.populate('postedBy', '_id name')
		.populate('comments.postedBy', '_id name')
		.exec((err, result) => {
			if (err) return res.status(422).json({ error: err });
			else return res.status(200).json(result);
		});
};

export const deletePostController = async (req, res) => {
	Post.findOne({ _id: req.params.postId })
		.populate('postedBy', '_id name')
		.exec((err, post) => {
			if (err || !post) return res.status(422).json({ error: err });
			if (post.postedBy._id.toString() === req.user._id.toString()) {
				post
					.remove()
					.then((result) => {
						res.json(result);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
};

export const deleteCommentController = async (req, res) => {
	const comment = { _id: req.params.commentId };
	console.log(1, req.params);

	Post.findByIdAndUpdate(
		req.params.id,
		{ $pull: { comments: comment } },
		{ new: true }
	)
		.populate('comments.postedBy', '_id name')
		.populate('postedBy', '_id name ')
		.exec((err, postComment) => {
			console.log('postComment', postComment);
			console.log('req.user._id', req.user._id);
			if (err || !postComment) return res.status(422).json({ error: err });

			if (postComment.postedBy._id.toString() === req.user._id.toString()) {
				res.json(postComment);
			}
		});
};
