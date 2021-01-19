import express from 'express';
import requireLogin from '../middleware/requireLogin.js';

import {
	userController,
	userAvatarController,
	followUserController,
	unFollowUserController,
} from '../controllers/userController.js';

const router = express.Router();
router
	.get('/user/:id', requireLogin, userController)
	.put('/updateavatar', requireLogin, userAvatarController)
	.put('/follow', requireLogin, followUserController)
	.put('/unfollow', requireLogin, unFollowUserController);

export default router;
