var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";
export function teacherMiddleWare(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.cookies["token"]) {
            res.status(401).json({ message: "you don't have a token cookie!" });
            return;
        }
        try {
            const teacherToken = req.cookies["token"];
            console.log(teacherToken);
            let decoded = jwt.verify(teacherToken, JWT_SECRET);
            console.log(decoded);
            const teacher = yield userModel.findById(decoded.id);
            if (!teacher) {
                res.status(404).json({ message: "the token you have shows that you no longer register" });
                return;
            }
            if (teacher.role !== "teacher") {
                res.status(403).json({ message: "you are not a teacher so you don't have access to the student's details" });
                return;
            }
            next();
        }
        catch (error) {
            res.status(403).json({ message: "Invalid token, the error is: " + error.message });
        }
    });
}
export function studentMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.cookies["token"]) {
            res.status(401).json({ message: "you don't have a token cookie!" });
            return;
        }
        if (!req.body.id) {
            res.status(400).json({ message: "you have to enter your id" });
            return;
        }
        try {
            const studentToken = req.cookies["token"];
            let decoded = jwt.verify(studentToken, JWT_SECRET);
            const student = yield userModel.findById(decoded.id);
            if (!student) {
                res.status(404).json({ message: "the token you have shows that you no longer register" });
                return;
            }
            console.log(student.id);
            if (student.id !== req.body.id) {
                res.status(403).json({ message: "you don't have access to another students account!" });
                return;
            }
            if (student.role !== "student") {
                res.status(403).json({ message: "you don't have access to students routes..." });
                return;
            }
            next();
        }
        catch (error) {
            res.status(403).json({ message: "Invalid token, the error is: " + error.message });
        }
    });
}
