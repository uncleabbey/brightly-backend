import { Router } from "express";
import { registerStudent, registerTeacher } from "../controllers";
import {
  validatStudentBody,
  validatTeacherBody,
} from "../middlewares/validation";

const router = new Router();

router
  .route("/signup/student")
  .post(validatStudentBody, registerStudent);
router
  .route("/signup/teacher")
  .post(validatTeacherBody, registerTeacher);

export default router;
