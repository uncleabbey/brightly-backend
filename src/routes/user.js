import { Router } from "express";
import {
  registerStudent,
  registerTeacher,
  loginUser,
  getUser,
  // getAllClassByStudent,
} from "../controllers";
import {
  validatStudentBody,
  validatTeacherBody,
  validateLoginBody,
} from "../middlewares/validation";
import verifyUser from "../middlewares/verifyUser";

const router = new Router();

router
  .route("/signup/student")
  .post(validatStudentBody, registerStudent);
router
  .route("/signup/teacher")
  .post(validatTeacherBody, registerTeacher);
router.route("/login").post(validateLoginBody, loginUser);

router.route("/me").get(verifyUser, getUser);
// router
//   .route("/students/:id/classes")
//   .get(verifyUser, getAllClassByStudent);
export default router;
