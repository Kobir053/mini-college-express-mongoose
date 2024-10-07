import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel, { User } from "../models/userModel.js";

const JWT_SECRET: string = process.env.JWT_SECRET || "my_secret_key";

export async function register (req: Request, res: Response, next: NextFunction) {
    try {
        const newUser = req.body;
        const pass = newUser.password;
        const passwordHash = await bcrypt.hash(pass, 10);
        newUser.password = passwordHash;

        const addedUser = await userModel.create(newUser);
        res.status(201).json({data: addedUser, success: true});

    } catch (error: any) {
        next(error);
    }
}

export async function login (req: Request, res: Response, next: NextFunction) {
    try {
        const userPassport = req.body.passportId;
        const userPassword = req.body.password;

        const foundedUser = await userModel.findOne({passportId: userPassport});

        if(foundedUser && await bcrypt.compare(userPassword, foundedUser.password)){
            const token = jwt.sign({passportId: userPassport, password: userPassword}, JWT_SECRET, {expiresIn: "1h"});

            res.cookie('token', token, {
                maxAge: 3600000, // 1 hour in milliseconds
                sameSite: 'strict', // Strict cross-site cookie policy
            });

            res.status(200).json({token: token, success: true});
            return;
        }

        res.status(404).json({message: "user not founded", success: false});

    } catch (error: any) {
        next(error);
    }
}