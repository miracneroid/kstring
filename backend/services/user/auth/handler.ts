import type { Request, Response } from "express"
import { addUser, getUser } from "./services.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createHash } from "crypto";

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const accessKey = process.env.ACCESS_KEY;
const refreshKey = process.env.REFRESH_KEY;
if(!secretKey || !accessKey || !refreshKey){
    console.log("keys in auth service are not set");
    throw new Error("Keys are not set in environment variables");
}

// helper functions

const createAccessToken = (userId: number): string => {
  return jwt.sign({ userId: userId }, accessKey, {expiresIn: "30mins"});
};

const createRefreshToken = (userId: number): string => {
  return jwt.sign({ userId: userId }, refreshKey, {expiresIn: "7d"});
}

const passwordHasher = (password: string|undefined) => {
  if(password === undefined){
    return;
  }
  return createHash("sha256")
    .update(password + secretKey)
    .digest("base64");
};

export const registerHandler = async (req: Request, res: Response) => {
    const {email, password} : {email:string, password: string} = req.body;
    const [tempuserId] = email.split('@');
    if (!tempuserId) {
        return res.status(400).json({
            message: "Invalid email provided"
        })    
    }
    const userId = Number(tempuserId);
    if(isNaN(userId)){
        console.log("number not numbering");
        return;
    }
    const expiresAt = "10-20-2020";
    const hashedPass = passwordHasher(password);
    if(!hashedPass){
        console.log("Password not passwording in auth service");
        throw new Error("Internal Issue");
    }
    try{
        const returnedUserId = await addUser(userId, email, hashedPass, expiresAt);
        const refreshToken = createRefreshToken(returnedUserId)
        const accessToken = createAccessToken(returnedUserId)
        res.status(200).json({
            refreshKey: refreshToken,
            accessKey: accessToken,
            message: "Successfully created"
        })

    }catch(e : any){
        const statusCode = e.statusCode || "500"
        const message = e.message || "Something went wrong"

        return res.status(statusCode).json({message: message})
    }
}

export const loginHandler = async(req: Request, res: Response) => {
    const {email, password} : {email:string, password:string}= req.body;
    if (!email || !password){
        return res.status(400).json({message: "Empty fields are not allowed"})
    }
    const hashedPass = passwordHasher(password);
    if (!hashedPass){
        return res.status(500).json({message: "Internal Error"})
    }
    try{
        const {userId, password} = await getUser(email);
        if(password === hashedPass){
            const refreshToken = createRefreshToken(userId);
            const accessToken = createAccessToken(userId);
            res.status(200).json({
                refreshKey: refreshToken,
                accessKey: accessToken,
                message: "Successfully logged in"
            })
        }
    }
    catch(e: any){
        const statusCode = e.statusCode || "500"
        const message = e.message || "Something went wrong"

        return res.status(statusCode).json({message: message})
    }
}

export const changePassword = async (req: Request, res: Response) => {
    
}