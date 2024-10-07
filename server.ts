import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import teacherRouter from "./routes/teacherRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Application = express();

connectDB();

app.use(express.json());

app.use("/", authRouter);

app.use("/teacher", teacherRouter);

app.use(errorHandler);

app.listen(PORT, ()=>{console.log("server listen on port ", PORT)});