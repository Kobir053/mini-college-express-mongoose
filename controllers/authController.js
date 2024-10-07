var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";
export function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = req.body;
            const pass = newUser.password;
            const passwordHash = yield bcrypt.hash(pass, 10);
            newUser.password = passwordHash;
            const addedUser = yield userModel.create(newUser);
            res.status(201).json({ data: addedUser, success: true });
        }
        catch (error) {
            next(error);
        }
    });
}
export function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userPassport = req.body.passportId;
            const userPassword = req.body.password;
            const foundedUser = yield userModel.findOne({ passportId: userPassport });
            if (foundedUser && (yield bcrypt.compare(userPassword, foundedUser.password))) {
                const token = jwt.sign({ passportId: userPassport, password: userPassword }, JWT_SECRET, { expiresIn: "1h" });
                res.cookie('token', token, {
                    maxAge: 3600000, // 1 hour in milliseconds
                    sameSite: 'strict', // Strict cross-site cookie policy
                });
                res.status(200).json({ token: token, success: true });
                return;
            }
            res.status(404).json({ message: "user not founded", success: false });
        }
        catch (error) {
            next(error);
        }
    });
}
