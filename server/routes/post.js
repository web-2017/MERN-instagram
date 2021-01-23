import express from 'express';
import requireLogin from '../middleware/requireLogin.js';
import {
	allPostsController,
	createPostController,
	myPosts,
	likePostController,
	unLikePostController,
	commentPostController,
	deletePostController,
	deleteCommentController,
	subscribePostsController,
} from '../controllers/createPostController.js';

const router = express.Router();

router
	.get('/allposts', requireLogin, allPostsController)
	.get('/subscribepost', requireLogin, subscribePostsController)
	.post('/createpost', requireLogin, createPostController)
	.get('/mypost', requireLogin, myPosts)
	.put('/like', requireLogin, likePostController)
	.put('/unlike', requireLogin, unLikePostController)
	.put('/comment', requireLogin, commentPostController)
	.delete('/deletepost/:postId', requireLogin, deletePostController)
	.delete(
		'/deletecomment/:id/:commentId',
		requireLogin,
		deleteCommentController
	);

export default router;
