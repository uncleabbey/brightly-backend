import { Router } from "express";
import { registerStudent } from "../controllers";
import { validatStudentBody } from "../middlewares/validation";

const router = new Router();

router
  .route("/signup/student")
  .post(validatStudentBody, registerStudent);

export default router;
