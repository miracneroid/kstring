import {Router} from "express";
import { loginHandler, registerHandler } from "./handler.js";
export const authRouter = Router();

authRouter.post('/login', loginHandler);
authRouter.post('register', registerHandler);