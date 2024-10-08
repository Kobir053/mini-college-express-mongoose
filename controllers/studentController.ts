import { NextFunction, Request, Response } from "express";
import userModel, { User } from "../models/userModel.js";

export async function getStudentGrades (req: Request, res: Response, next: NextFunction) {
    try {
        const student: User | null = await userModel.findById(req.body.id);
        res.status(200).json({grades: student!.grades, success: true});
    } 
    catch (error: any) {
        next(error);
    }
}

export async function getAverageOfStudentGrades (req: Request, res: Response, next: NextFunction) {
    try {
        const student: User | null = await userModel.findById(req.body.id);
        let sum = 0;
        student!.grades.forEach((grade) => {
            sum += grade;
        })
        const avg = sum/student!.grades.length;
        res.status(200).json({average: avg, success: true});
    } 
    catch (error: any) {
        next(error);
    }
}