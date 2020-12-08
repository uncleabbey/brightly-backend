import express from "express";
import {
  addTimeTable,
  getAllTimeTable,
  deleteTimeTable,
  editTimeTable,
  getTableById,
  getTimeTableByGrade,
} from "../controllers";
import verifyUser from "../middlewares/verifyUser";
import isTeacher from "../middlewares/isTeacher";
import { validateTimeTableBody } from "../middlewares/validation";

const router = new express.Router();

router.get("/timetable/grade/:grade", getTimeTableByGrade);

router
  .route("/timetable")
  .post(validateTimeTableBody, verifyUser, isTeacher, addTimeTable)
  .get(verifyUser, getAllTimeTable);

router
  .route("/timetable/:id")
  .get(verifyUser, getTableById)
  .patch(verifyUser, isTeacher, editTimeTable)
  .delete(verifyUser, isTeacher, deleteTimeTable);
export default router;
