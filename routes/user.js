import express from 'express';
import requireLogin from '../middleware/requireLogin.js';

import {
	userController,
	userUpdateProfileImage,
	followUserController,
	unFollowUserController,
} from '../controllers/userController.js';

const router = express.Router();
router
	.get('/user/:id', requireLogin, userController)
	.put('/updatepic', requireLogin, userUpdateProfileImage)
	.put('/follow', requireLogin, followUserController)
	.put('/unfollow', requireLogin, unFollowUserController);

export default router;
