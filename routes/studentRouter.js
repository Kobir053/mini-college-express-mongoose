import express from "express";
import { studentMiddleware } from "../middlewares/authMiddleware.js";
import { getAverageOfStudentGrades, getStudentGrades } from "../controllers/studentController.js";
const router = express.Router();
router.use(studentMiddleware);
router.route("/grades").get(getStudentGrades);
router.route("/grades/average").get(getAverageOfStudentGrades);
export default router;
