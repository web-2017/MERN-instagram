import express from "express";
import Post from "../models/post.js";
import requireLogin from "../middleware/requireLogin.js";
import {
    allPostsController,
    createPostController,
    myPosts,
    likePostController,
    unLikePostController,
    commentPostController
} from "../controllers/createPostController.js";

const router = express.Router()

router
    .get('/allposts', requireLogin, allPostsController)
    .post('/createpost', requireLogin, createPostController)
    .get('/mypost', requireLogin, myPosts)
    .put('/like', requireLogin, likePostController)
    .put('/unlike', requireLogin, unLikePostController)
    .put('/comment', requireLogin, commentPostController)

export default router