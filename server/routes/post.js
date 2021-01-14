import express from "express";
import requireLogin from "../middleware/requireLogin.js";
import {
    allPostsController,
    createPostController,
    myPosts,
    likePostController,
    unLikePostController,
    commentPostController,
    deletePostController
} from "../controllers/createPostController.js";

const router = express.Router()

router
    .get('/allposts', requireLogin, allPostsController)
    .post('/createpost', requireLogin, createPostController)
    .get('/mypost', requireLogin, myPosts)
    .put('/like', requireLogin, likePostController)
    .put('/unlike', requireLogin, unLikePostController)
    .put('/comment', requireLogin, commentPostController)
    .delete('/deletepost/:postId', requireLogin, deletePostController)

export default router