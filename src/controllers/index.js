import {
  registerStudent,
  registerTeacher,
  loginUser,
  getUser,
  changePassword,
  changeAvatar,
} from "./user";
import {
  RegisterStudentForClass,
  batchRegisterStudentForClass,
  createClass,
  deleteClass,
  editClass,
  getAllClass,
  getAllClassByStudent,
  getClass,
  getStudentInAClass,
} from "./class";
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

import { addResources, getResourcesById } from "./resources";
import addComment from "./comment";

export {
  registerStudent,
  registerTeacher,
  loginUser,
  getUser,
  RegisterStudentForClass,
  batchRegisterStudentForClass,
  createClass,
  deleteClass,
  editClass,
  getAllClass,
  getAllClassByStudent,
  getClass,
  getStudentInAClass,
  createLesson,
  getLessonsByForAClass,
  getLesson,
  editLesson,
  deleteLesson,
  getAllLessons,
  addTimeTable,
  getAllTimeTable,
  deleteTimeTable,
  editTimeTable,
  getTableById,
  getTimeTableByGrade,
  addResources,
  addComment,
  getResourcesById,
  changePassword,
  changeAvatar,
};
