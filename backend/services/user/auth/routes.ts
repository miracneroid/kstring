import {Router} from "express";
import { changePassword, loginHandler, registerHandler, resetAccessToken } from "./handler.js";
export const authRouter = Router();

authRouter.post('/login', loginHandler);
authRouter.post('/register', registerHandler);
authRouter.post('/change-password', changePassword);
authRouter.get('/refresh', resetAccessToken);