import express, { Router } from "express";
import { addGradeToStudent, deleteGradeOfStudent, editGradeOfStudent, getAllStudents, getGradesOfStudent } from "../controllers/teacherController.js";

const router: Router = express.Router();

router.route("/").get(getAllStudents);

router.route("/grades")
.get(getGradesOfStudent)
.post(addGradeToStudent)
.put(editGradeOfStudent)
.delete(deleteGradeOfStudent);

export default router;