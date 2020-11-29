import { Router } from "express";
import {
  registerStudent,
  registerTeacher,
  loginUser,
} from "../controllers";
import {
  validatStudentBody,
  validatTeacherBody,
  validateLoginBody,
} from "../middlewares/validation";

const router = new Router();

router
  .route("/signup/student")
  .post(validatStudentBody, registerStudent);
router
  .route("/signup/teacher")
  .post(validatTeacherBody, registerTeacher);
router.route("/login").post(validateLoginBody, loginUser);
export default router;
