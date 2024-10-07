import { NextFunction, Request, Response } from "express";
import jwt, { DecodeOptions, JwtPayload } from "jsonwebtoken";
import userModel from "../models/userModel.js";

const JWT_SECRET: string = process.env.JWT_SECRET || "my_secret_key";

export async function teacherMiddleWare (req: Request, res: Response, next: NextFunction) {
    if(!req.cookies["token"]){
        res.status(401).json({message: "you don't have a token cookie!"});
        return;
    }
    
    try {
        const teacherToken = req.cookies["token"];
        console.log(teacherToken);
        let decoded = jwt.verify(teacherToken, JWT_SECRET) as {id: string, iat: number, exp: number};
        console.log(decoded);
        const teacher = await userModel.findById(decoded.id);

        if(!teacher){
            res.status(404).json({message: "the token you have shows that you no longer loged in"});
            return;
        }

        if(teacher.role !== "teacher"){
            res.status(403).json({message: "you are not a teacher so you don't have access to the student's details"});
            return;
        }

        next();
    } 
    catch (error: any) {
        res.status(403).json({message:"Invalid token, the error is: " + error.message});
    }
}