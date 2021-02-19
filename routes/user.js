import express from 'express';
import requireLogin from '../middleware/requireLogin.js';

import {
	userController,
	userUpdateProfileImage,
	followUserController,
	unFollowUserController,
	searchUsersHandler
} from '../controllers/userController.js';

const router = express.Router();
router
	.get('/user/:id', requireLogin, userController)
	.put('/updatepic', requireLogin, userUpdateProfileImage)
	.put('/follow', requireLogin, followUserController)
	.put('/unfollow', requireLogin, unFollowUserController)
	.post('/search-users', searchUsersHandler)

export default router;
