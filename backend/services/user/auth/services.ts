import { eq } from "drizzle-orm";
import { db } from "../drizzle/index.js";
import { users } from "../drizzle/schema.js";
import type {User} from "../drizzle/types.js";
import { AppError, ConflictError, ValidationError,  } from "../error.js";

export const addUser = async (userId : number, email: string, password: string, expiresAt: string): Promise<number> => {

    const date = new Date(expiresAt);
    if(isNaN(date.getDate())){
        console.log("The date function not working in auth services");
        throw new ValidationError("Invalid date format");
    }
    const temp: User = {
        email: email,
        userId: userId,
        password: password,
        expiresAt: date
    }
    try{
        const result :{userId: number}[]= await db.insert(users).values(temp).onConflictDoNothing().returning({userId : users.userId});
        const userId = result[0]?.userId;
        if (!userId){
            throw new ConflictError("Account already present Please log in")
        }
        return userId;
    } catch(e){
        if (e instanceof AppError){
            throw e
        }
        console.log("error in db call for auth"+ e);
        throw e;
    }
}

export const getUser = async (email: string): Promise<{userId:number, password:string}> => {
    try{
        const dbResult = await db.select({userId:users.userId, password: users.password}).from(users).where(eq(users.email,email)).limit(1);
    
        const password = dbResult[0]?.password;
        const userId = dbResult[0]?.userId;
        if(!password || !userId){
            throw new ValidationError("No such account exists");
        }
        return {userId, password};
    }catch(e){
        if(e instanceof AppError){
            throw e
        }
        console.log("broke in getUser");
        throw new Error("Internal crash")
    }
}