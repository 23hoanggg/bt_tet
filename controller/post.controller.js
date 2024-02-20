import express from 'express';
import { asynCatch } from '../utils/trycatch.js';
import { createPost, deletePost } from '../service/post.service.js';
import { validatePost } from '../validation/post.validation.js';
import { authen } from '../utils/authen.js';
import { author } from '../utils/author.js';

const postController = express.Router();

postController.post('/',asynCatch(authen),asynCatch(validatePost),asynCatch(createPost));
postController.delete('/:postId',asynCatch(author),asynCatch(deletePost));
export { postController };
