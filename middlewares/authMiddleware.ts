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
            res.status(404).json({message: "the token you have shows that you no longer register"});
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

export async function studentMiddleware (req: Request, res: Response, next: NextFunction) {

    if(!req.cookies["token"]){
        res.status(401).json({message: "you don't have a token cookie!"});
        return;
    }

    if(!req.body.id){
        res.status(400).json({message: "you have to enter your id"});
        return;
    }
    
    try {
        const studentToken = req.cookies["token"];
        let decoded = jwt.verify(studentToken, JWT_SECRET) as {id: string, iat: number, exp: number};
        const student = await userModel.findById(decoded.id);

        if(!student){
            res.status(404).json({message: "the token you have shows that you no longer register"});
            return;
        }

        if(student._id !== req.body.id){
            res.status(403).json({message: "you don't have access to another students account!"});
            return;
        }

        if(student.role !== "student"){
            res.status(403).json({message: "you don't have access to students routes..."});
            return;
        }

        next();
    } 
    catch (error: any) {
        res.status(403).json({message:"Invalid token, the error is: " + error.message});
    }
}