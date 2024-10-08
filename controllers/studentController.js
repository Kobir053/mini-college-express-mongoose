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
export function getStudentGrades(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const student = yield userModel.findById(req.body.id);
            res.status(200).json({ grades: student.grades, success: true });
        }
        catch (error) {
            next(error);
        }
    });
}
export function getAverageOfStudentGrades(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const student = yield userModel.findById(req.body.id);
            if (student.grades.length == 0) {
                res.status(200).json({ message: "you don't have any grades..", average: 0 });
                return;
            }
            let sum = 0;
            student.grades.forEach((grade) => {
                sum += grade.grade;
            });
            const avg = sum / student.grades.length;
            res.status(200).json({ average: avg, success: true });
        }
        catch (error) {
            next(error);
        }
    });
}
