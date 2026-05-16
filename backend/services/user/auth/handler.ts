import type { Request, Response } from "express"
import { addUser, getUser, getUserById, updateUser } from "./services.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
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
    if(!email || !password){
        return res.status(400).json({message: "Empty fields are not allowed"})
    }
    const [tempuserId] = email.split('@');
    if (!tempuserId) {
        return res.status(400).json({
            message: "Invalid email provided"
        })    
    }
    const userId = Number(tempuserId);
    if(isNaN(userId)){
        console.log("number not numbering");
        return res.status(400).json({message: "Invalid email provided"})
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
        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            sameSite: 'none',
            maxAge: 7*24*60*60*1000,
            path: '/'
        });
        res.status(200).json({
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
            res.cookie('refreshToken',refreshToken,{
                httpOnly: true,
                sameSite: 'none',
                maxAge: 7*24*60*60*1000,
                path: '/'
            });
            res.status(200).json({
                accessKey: accessToken,
                message: "Successfully logged in"
            })
        }else{
            return res.status(401).json({message: "No such account exists"})
        }
    }
    catch(e: any){
        const statusCode = e.statusCode || "500"
        const message = e.message || "Something went wrong"

        return res.status(statusCode).json({message: message})
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try{
        const accessToken = req.headers.authorization?.split(' ')[1];
        const {newPass}: {newPass:string} = req.body;
        if(!accessToken){
            return res.status(401).json({message: "Unauthorized Access"});
        }       
        const decode = jwt.verify(accessToken,accessKey) as jwt.JwtPayload
        const {userId} = decode;
        if(typeof(userId) !== 'number'){
            return res.status(400).json({message: "Invalid request Log in Again"})
        }
        const currentPass = await getUserById(userId);
        const newHashedPass = passwordHasher(newPass);
        if(!newHashedPass){
            console.log("Password not passwording in auth service");
             throw new Error("Internal Issue");
        }
        if (currentPass === newHashedPass){
            return res.status(400).json({message: "New Password cannot be equal to Old Password"})
        }
        const _ = await updateUser(userId, newHashedPass);
        return res.status(200).json({message: "Password changed successfully"})
    }catch(e : any){
        if (e.name === 'TokenExpiredError'){
            // probably using 402 to trigger a password change is not good but eh who cares it works .
            return res.status(402).json({ message: "Expired token."});
        }
        if (e.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid signature. Log in again."});
        }
        const statusCode = e.statusCode || "500"
        const message = e.message || "Something went wrong"

        return res.status(statusCode).json({message: message})
    }
}

export const resetAccessToken = async (req: Request, res: Response) => {
    try{
        const refreshTokenCookie = req.cookies.refreshToken;
        if(!refreshTokenCookie){
            return res.status(401).json({message:"Please Log In Again"})
        }
        const {userId} = jwt.verify(refreshTokenCookie, refreshKey) as JwtPayload
        if(typeof(userId) !== 'number'){
            return res.status(401).json({message:"Please Log In Again"})
        }
        const refreshToken = createRefreshToken(userId);
        const accessToken = createAccessToken(userId);
        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            sameSite: 'none',
            maxAge: 7*24*60*60*1000,
            path: '/'
        });
        res.status(200).json({
            accessKey: accessToken,
            message: "Successfully logged in"
        })
    }catch(e : any){
        if (e.name === 'JsonWebTokenError' || e.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Invalid signature. Log in again."});
        }
        const statusCode = e.statusCode || "500"
        const message = e.message || "Something went wrong"

        return res.status(statusCode).json({message: message})
    }
}