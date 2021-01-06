import express from "express";

const router = express.Router()

import requireLogin from "../middleware/requireLogin.js";
import {signUpUser, protectedVerification, signInUser} from "../controllers/authContoller.js";

router
    .get('/protected', requireLogin, protectedVerification)
    .post('/signup', signUpUser)
    .post('/signin', signInUser)

export default router
