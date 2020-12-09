import express from "express";
import {
  createLesson,
  getLessonsByForAClass,
  getLesson,
  editLesson,
  deleteLesson,
  getAllLessons,
  addResources,
  addComment,
} from "../controllers";

// import addResources from "../controllers/resources";
import { validateLessonBody } from "../middlewares/validation";
import verifyUser from "../middlewares/verifyUser";
import isTeacher from "../middlewares/isTeacher";
import { multerUploads } from "../middlewares/multer";

const router = new express.Router();

router.get("/lessons", verifyUser, getAllLessons);
router
  .route("/class/:classId/lessons")
  .post(validateLessonBody, verifyUser, isTeacher, createLesson)
  .get(getLessonsByForAClass);

router.post(
  "/lessons/:lessonId/resources",
  verifyUser,
  isTeacher,
  multerUploads,
  addResources
);
router
  .route("/lessons/:lessonId/comments")
  .post(verifyUser, addComment);

router
  .route("/lessons/:lessonId")
  .get(verifyUser, getLesson)
  .patch(verifyUser, isTeacher, editLesson)
  .delete(verifyUser, isTeacher, deleteLesson);

export default router;
