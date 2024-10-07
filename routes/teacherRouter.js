import express from "express";
import { addGradeToStudent, deleteGradeOfStudent, deleteStudent, editGradeOfStudent, getAllStudents, getAverageOfGrades, getGradesOfStudent } from "../controllers/teacherController.js";
import { teacherMiddleWare } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.use(teacherMiddleWare);
router.route("/").get(getAllStudents).delete(deleteStudent);
router.route("/grades")
    .get(getGradesOfStudent)
    .post(addGradeToStudent)
    .put(editGradeOfStudent)
    .delete(deleteGradeOfStudent);
router.route("/grades/average").get(getAverageOfGrades);
export default router;
