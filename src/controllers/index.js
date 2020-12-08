import {
  registerStudent,
  registerTeacher,
  loginUser,
  getUser,
} from "./user";
import {
  createClass,
  editClass,
  getAllClass,
  getClass,
  deleteClass,
  RegisterStudentForClass,
  batchRegisterStudentForClass,
  getStudentInAClass,
  getAllClassByStudent,
} from "./classes";

import {
  createLesson,
  getLessonsByForAClass,
  getLesson,
  editLesson,
  deleteLesson,
  getAllLessons,
} from "./lesson";

import {
  addTimeTable,
  getAllTimeTable,
  deleteTimeTable,
  editTimeTable,
  getTableById,
  getTimeTableByGrade,
} from "./timeTable";

export {
  registerStudent,
  registerTeacher,
  loginUser,
  getUser,
  createClass,
  editClass,
  getAllClass,
  getClass,
  deleteClass,
  RegisterStudentForClass,
  batchRegisterStudentForClass,
  getStudentInAClass,
  createLesson,
  getLessonsByForAClass,
  getLesson,
  editLesson,
  deleteLesson,
  getAllClassByStudent,
  addTimeTable,
  getAllTimeTable,
  deleteTimeTable,
  editTimeTable,
  getTableById,
  getTimeTableByGrade,
  getAllLessons,
};
