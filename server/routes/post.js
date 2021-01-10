import express from "express";
import Post from "../models/post.js";
import requireLogin from "../middleware/requireLogin.js";
import {PostsController, createPostController, PostController} from "../controllers/createPostController.js";

const router = express.Router()

router
    .get('/posts', PostsController)
    .post('/createpost', requireLogin, createPostController)
    .get('/post', requireLogin, PostController)

export default router