import express from 'express';
import { asynCatch } from '../utils/trycatch.js';
import { login,refresh,register } from '../service/auth.service.js';
import { validateLogin, validateRegister, validateRefresh } from '../validation/auth.validation.js';

const authController = express.Router();

authController.post('/register',asynCatch(validateRegister), asynCatch(register));
authController.post('/login', asynCatch(validateLogin), asynCatch(login));
authController.post('/refresh',asynCatch(validateRefresh),asynCatch(refresh));

export {authController};
