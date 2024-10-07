import express from "express";
import { addGradeToStudent, deleteGradeOfStudent, deleteStudent, editGradeOfStudent, getAllStudents, getGradesOfStudent } from "../controllers/teacherController.js";
const router = express.Router();
router.route("/").get(getAllStudents).delete(deleteStudent);
router.route("/grades")
    .get(getGradesOfStudent)
    .post(addGradeToStudent)
    .put(editGradeOfStudent)
    .delete(deleteGradeOfStudent);
export default router;
