import express from 'express';
import { asynCatch } from '../utils/trycatch.js';
import { changeInforUser, getMe } from '../service/user.service.js';
import { authen } from '../utils/authen.js';
import { author } from '../utils/author.js';
import { getAllUsers } from '../service/user.service.js';

const userController = express.Router();

userController.get('/me',asynCatch(authen), asynCatch(getMe));
userController.get('/',asynCatch(authen),asynCatch(author),asynCatch(getAllUsers));
userController.post('/changeInfor',asynCatch(changeInforUser));

export { userController };
