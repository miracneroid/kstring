import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./auth/routes.js";
import cookieParser from "cookie-parser";
import { profileRouter } from "./profile/routes.js";
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/", profileRouter);

app.listen(port, () => {
  console.log(`Listening to user port: ${port}`);
});
