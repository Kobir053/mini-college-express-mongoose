var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userModel from "../models/userModel.js";
export function getGradesOfStudent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.id) {
            res.status(400).json({ message: "you need to enter the student's id" });
            return;
        }
        try {
            const studentId = req.body.id;
            const student = yield userModel.findById(studentId);
            if (!student) {
                res.status(404).json({ message: `could not find user with id ${studentId}` });
                return;
            }
            res.status(200).json({ grades: student.grades, success: true });
        }
        catch (error) {
            next(error);
        }
    });
}
export function addGradeToStudent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.id) {
            res.status(400).json({ message: "you need to enter the student's id" });
            return;
        }
        if (!req.body.subject || !req.body.grade) {
            res.status(400).json({ message: "you need to enter subject and grade" });
            return;
        }
        try {
            const subject = req.body.subject;
            const grade = req.body.grade;
            const updated = yield userModel.updateOne({ _id: req.body.id }, { $push: { grades: { subject: subject, grade: grade } } });
            if (!updated) {
                res.status(400).json({ message: "couldn't add a grade for the student" });
                return;
            }
            res.status(200).json({ updated: updated, success: true });
        }
        catch (error) {
            next(error);
        }
    });
}
export function editGradeOfStudent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.id) {
            res.status(400).json({ message: "you need to enter the student's id" });
            return;
        }
        if (!req.body.subject || !req.body.grade) {
            res.status(400).json({ message: "you need to enter subject and grade" });
            return;
        }
        try {
            const subject = req.body.subject;
            const grade = req.body.grade;
            const updated = yield userModel.updateOne({ _id: req.body.id }, { $set: { grades: { subject: subject, grade: grade } } });
            if (!updated) {
                res.status(400).json({ message: "couldn't edit the grade for the student" });
                return;
            }
            res.status(200).json({ updated: updated, success: true });
        }
        catch (error) {
            next(error);
        }
    });
}
export function deleteGradeOfStudent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.id) {
            res.status(400).json({ message: "you need to enter the student's id" });
            return;
        }
        if (!req.body.subject) {
            res.status(400).json({ message: "you need to enter the subject" });
            return;
        }
        try {
            const subject = req.body.subject;
            const updated = yield userModel.updateOne({ _id: req.body.id }, { $pull: { grades: { subject: subject } } });
            if (!updated) {
                res.status(400).json({ message: "couldn't delete the grade for the student" });
                return;
            }
            res.status(200).json({ updated: updated, success: true });
        }
        catch (error) {
            next(error);
        }
    });
}
export function getAllStudents(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allStudents = yield userModel.find({ role: "student" });
            if (!allStudents) {
                res.status(404).json({ message: "didn't found any students" });
                return;
            }
            res.status(200).json({ students: allStudents, success: true });
        }
        catch (error) {
            next(error);
        }
    });
}
export function deleteStudent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.id) {
            res.status(400).json({ message: "you need to enter the student's id" });
            return;
        }
        try {
            const user = yield userModel.findById(req.body.id);
            if (!user) {
                res.status(404).json({ message: "user are not found" });
                return;
            }
            if (user.role !== "student") {
                res.status(400).json({ message: "you can only delete students" });
                return;
            }
            const deleted = yield userModel.findByIdAndDelete(req.body.id);
            res.status(200).json({ message: "deleted successfully", deleted: deleted, success: true });
        }
        catch (error) {
            next(error);
        }
    });
}
export function getAverageOfGrades(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.id) {
            res.status(400).json({ message: "you need to enter the student's id" });
            return;
        }
        try {
            const studentId = req.body.id;
            const student = yield userModel.findById(studentId);
            if (!student) {
                res.status(404).json({ message: `could not find student with id ${studentId}` });
                return;
            }
            let sum = 0;
            student.grades.forEach((grade) => {
                sum += grade;
            });
            let avg = sum / student.grades.length;
            res.status(200).json({ average_of_grades: avg, success: true });
        }
        catch (error) {
            next(error);
        }
    });
}
