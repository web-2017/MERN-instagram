import express from 'express';
import requireLogin from '../middleware/requireLogin.js';

import {
	userController,
	userAvatarController,
} from '../controllers/userController.js';

const router = express.Router();
router
	.get('/user/:id', requireLogin, userController)
	.put('/updateavatar', requireLogin, userAvatarController);

export default router;
