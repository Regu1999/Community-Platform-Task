import express from 'express'
import { body } from "express-validator"

import { createPost, getPosts, deletePost, updatePost } from '../controler/post.js'
import { checkAuth } from "../util/auth.js"

const router = express.Router();

router.post('/post', checkAuth, body('text', 'Canot post empty message').trim().notEmpty()
    .isLength({ min: 15 })
    .withMessage("post minimum 15 letters required"), createPost);

router.get('/posts', checkAuth, getPosts);

router.put('/updatePost', [body('text', 'Canot post empty message').trim().notEmpty()
    .isLength({ min: 15 })
    .withMessage("post minimum 15 letters required"), body('postId', 'Canot post empty message')], checkAuth, updatePost)

router.delete('/delete/:postId', checkAuth, deletePost)

export default router;