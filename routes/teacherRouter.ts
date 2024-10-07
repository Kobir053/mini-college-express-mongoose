import express, { Router } from "express";
import { addGradeToStudent, deleteGradeOfStudent, deleteStudent, editGradeOfStudent, getAllStudents, getAverageOfGrades, getGradesOfStudent } from "../controllers/teacherController.js";

const router: Router = express.Router();

router.route("/").get(getAllStudents).delete(deleteStudent);

router.route("/grades")
.get(getGradesOfStudent)
.post(addGradeToStudent)
.put(editGradeOfStudent)
.delete(deleteGradeOfStudent);

router.route("/grades/average").get(getAverageOfGrades);

export default router;