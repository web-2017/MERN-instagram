import express from "express";
import Post from "../models/post.js";
import requireLogin from "../middleware/requireLogin.js";
import {allPostsController, createPostController, PostController} from "../controllers/createPostController.js";

const router = express.Router()

router
    .get('/allposts', requireLogin, allPostsController)
    .post('/createpost', requireLogin, createPostController)
    .get('/post', requireLogin, PostController)

export default router