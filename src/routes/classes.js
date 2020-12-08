import express from "express";
import {
  createClass,
  editClass,
  deleteClass,
  getAllClass,
  getClass,
  RegisterStudentForClass,
  batchRegisterStudentForClass,
  getStudentInAClass,
  getAllClassByStudent,
} from "../controllers";
import isTeacher from "../middlewares/isTeacher";
import verifyUser from "../middlewares/verifyUser";
import { validateClassBody } from "../middlewares/validation";

const router = new express.Router();

router
  .route("/")
  .get(verifyUser, getAllClass)
  .post(verifyUser, isTeacher, createClass);

router.route("/student/all").get(verifyUser, getAllClassByStudent);
router
  .route("/students/:studentId/batch")
  .post(verifyUser, batchRegisterStudentForClass);

router
  .route("/:id/students/:studentId")
  .post(validateClassBody, verifyUser, RegisterStudentForClass);
router.route("/:id/students").get(verifyUser, getStudentInAClass);
router
  .route("/:id")
  .get(verifyUser, getClass)
  .patch(verifyUser, isTeacher, editClass)
  .delete(verifyUser, isTeacher, deleteClass);

export default router;
