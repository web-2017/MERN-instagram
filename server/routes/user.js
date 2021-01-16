import express from "express";
import requireLogin from "../middleware/requireLogin.js";

import userController from "../controllers/userController.js";

const router = express.Router()
router
    .get('/user/:id', requireLogin, userController)

export default router