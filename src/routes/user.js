import { Router } from "express";
import { multerUploads } from "../middlewares/multer";
import {
  registerStudent,
  registerTeacher,
  loginUser,
  getUser,
  changePassword,
  changeAvatar,
} from "../controllers";
import {
  validatStudentBody,
  validatTeacherBody,
  validateLoginBody,
  validatePasswordBody,
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

router
  .route("/change/password")
  .patch(validatePasswordBody, verifyUser, changePassword);
router
  .route("/change/avatar")
  .patch(verifyUser, multerUploads, changeAvatar);

export default router;
