import express from 'express'

import { } from '../controler/post.js'
import { checkAuth } from "../util/auth.js"
const router = express.Router();

router.get('/posts', checkAuth);



export default router;