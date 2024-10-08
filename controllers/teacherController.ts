import { NextFunction, Request, Response } from "express";
import userModel, { User } from "../models/userModel.js";

export async function getGradesOfStudent (req: Request, res: Response, next: NextFunction) {

    if(!req.body.id){
        res.status(400).json({message: "you need to enter the student's id"});
        return;
    }

    try {
        const studentId = req.body.id;
        const student: User | null = await userModel.findById(studentId);

        if(!student){
            res.status(404).json({message: `could not find user with id ${studentId}`});
            return;
        }

        res.status(200).json({grades: student.grades, success: true});
    } 
    catch (error: any) {
        next(error);
    }
}

export async function addGradeToStudent (req: Request, res: Response, next: NextFunction) {

    if(!req.body.id){
        res.status(400).json({message: "you need to enter the student's id"});
        return;
    }
    if(!req.body.subject || !req.body.grade){
        res.status(400).json({message: "you need to enter subject and grade"});
        return;
    }

    try {
        const subject: string = req.body.subject;
        const grade: number = req.body.grade;

        const updated = await userModel.updateOne({_id: req.body.id}, {$push: {grades: {subject: subject, grade: grade}}});
        if(!updated){
            res.status(400).json({message: "couldn't add a grade for the student"});
            return;
        }
        
        res.status(200).json({updated: updated, success: true});
    } 
    catch (error: any) {
        next(error);
    }
}

export async function editGradeOfStudent (req: Request, res: Response, next: NextFunction) {

    if(!req.body.id){
        res.status(400).json({message: "you need to enter the student's id"});
        return;
    }
    if(!req.body.subject || !req.body.grade){
        res.status(400).json({message: "you need to enter subject and grade"});
        return;
    }

    try {
        const subject: string = req.body.subject;
        const grade: number = req.body.grade;

        const updated = await userModel.updateOne({_id: req.body.id}, {$set: {grades: {subject: subject, grade: grade}}});
        if(!updated){
            res.status(400).json({message: "couldn't edit the grade for the student"});
            return;
        }
        
        res.status(200).json({updated: updated, success: true});
    } 
    catch (error: any) {
        next(error);
    }
}

export async function deleteGradeOfStudent (req: Request, res: Response, next: NextFunction) {

    if(!req.body.id){
        res.status(400).json({message: "you need to enter the student's id"});
        return;
    }
    if(!req.body.subject){
        res.status(400).json({message: "you need to enter the subject"});
        return;
    }

    try {
        const subject: string = req.body.subject;

        const updated = await userModel.updateOne({_id: req.body.id}, {$pull: {grades: {subject: subject}}});
        if(!updated){
            res.status(400).json({message: "couldn't delete the grade for the student"});
            return;
        }
        
        res.status(200).json({updated: updated, success: true});
    } 
    catch (error: any) {
        next(error);
    }
}

export async function getAllStudents (req: Request, res: Response, next: NextFunction) {
    try {
        const allStudents: User[] = await userModel.find({role: "student"});
        if(!allStudents){
            res.status(404).json({message: "didn't found any students"});
            return;
        }
        res.status(200).json({students: allStudents, success: true});
    } 
    catch (error: any) {
        next(error);
    }
}

export async function deleteStudent (req: Request, res: Response, next: NextFunction) {
    if(!req.body.id){
        res.status(400).json({message: "you need to enter the student's id"});
        return;
    }
    
    try {
        const user: User | null = await userModel.findById(req.body.id);
        if(!user){
            res.status(404).json({message: "user are not found"});
            return;
        }
        if(user.role !== "student"){
            res.status(400).json({message: "you can only delete students"});
            return;
        }

        const deleted = await userModel.findByIdAndDelete(req.body.id);
        res.status(200).json({message: "deleted successfully", deleted: deleted, success: true});
    } 
    catch (error: any) {
        next(error);
    }
}

export async function getAverageOfGrades (req: Request, res: Response, next: NextFunction) {

    if(!req.body.id){
        res.status(400).json({message: "you need to enter the student's id"});
        return;
    }

    try {
        const studentId = req.body.id;
        const student: User | null = await userModel.findById(studentId);

        if(!student){
            res.status(404).json({message: `could not find student with id ${studentId}`});
            return;
        }
        if(student!.grades.length == 0){
            res.status(200).json({message: "you don't have any grades..", average: 0});
            return;
        }
        
        let sum = 0;
        student.grades.forEach((grade) => {
            sum += grade;
        });
        let avg = sum/student.grades.length;
        res.status(200).json({average_of_grades: avg, success: true});
    } 
    catch (error: any) {
        next(error);
    }
}