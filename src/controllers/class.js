import _ from "lodash";
import { Class, Student } from "../models";
import successResponse from "../helpers/successResponse";

export const createClass = async (req, res, next) => {
  try {
    const { schedules, grade, subject } = req.body;
    const teacher = req.user._id;
    const classes = new Class({
      schedules,
      grade,
      subject,
      teacher,
    });
    await classes.save();
    const message = "Class created succesfully";
    const data = {
      class: classes,
    };
    return successResponse(res, 201, message, data);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const editClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { schedules, grade, subject } = req.body;
    const getClass = await Class.findById(id);
    if (getClass) {
      getClass.schedules = schedules;
      getClass.grade = grade;
      getClass.subject = subject;
      await getClass.save();
      const message = "class updated successfully";
      const data = {
        class: getClass,
      };
      return successResponse(res, 200, message, data);
    }
    return next({
      status: 404,
      error: "class not found in the database",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const getAllClass = async (req, res, next) => {
  try {
    const classes = await Class.find();
    const message = "Classes retrieved successfully";
    const data = {
      classes,
    };
    return successResponse(res, 200, message, data);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const getClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getClassDetails = await Class.findById(id).populate({
      path: "lessons students",
      populate: { path: "resources comments", populate: "author", select: [
        "-password",
        "-kind",
        "-isAdmin",
        "-isTeacher",
        "-__v",
        "-grade",
      ], },
      select: [
        "-password",
        "-kind",
        "-isAdmin",
        "-isTeacher",
        "-__v",
        "-grade",
      ],
    });
    if (getClassDetails) {
      const message = "Classes retrieved successfully";
      const data = {
        class: getClassDetails,
      };
      return successResponse(res, 200, message, data);
    }
    return next({
      status: 404,
      error: "class not found in the database",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
export const deleteClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getClassDetails = await Class.findById(id);
    if (getClassDetails) {
      await getClassDetails.deleteOne();
      const message = "Classes deleted successfully";
      return successResponse(res, 200, message);
    }
    return next({
      status: 404,
      error: "class not found in the database",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
export const batchRegisterStudentForClass = async (
  req,
  res,
  next
) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate(
      "classes"
    );
    if (student) {
      const { grade } = student;
      const classes = await Class.find({ grade });
      classes.forEach((cl) => {
        student.classes.push(cl._id);
        cl.students.push(student._id);
        cl.save();
      });
      const message = "student added to class successfully";
      const data = {
        student,
      };
      return successResponse(res, 201, message, data);
    }
    return next({
      status: 404,
      error: "student not found in the database",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const RegisterStudentForClass = async (req, res, next) => {
  try {
    const { id, studentId } = req.params;
    await Student.findByIdAndUpdate(
      studentId,
      {
        $addToSet: { classes: id },
      },
      { useFindAndModify: false }
    );
    const findClass = await Class.findByIdAndUpdate(
      id,
      {
        $addToSet: { students: studentId },
      },
      { useFindAndModify: false }
    ).populate("students");
    if (findClass) {
      const message = "student added to class successfully";
      const data = {
        class: findClass,
      };
      return successResponse(res, 201, message, data);
    }
    return next({
      status: 404,
      error: "class not found in the database",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const getStudentInAClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findClass = await Class.findById(id).populate({
      path: "students",
      select: [
        "-password",
        "-__v",
        "-isAdmin",
        "-isTeacher",
        "-grade",
        "-classes",
        "-kind",
      ],
    });
    if (findClass) {
      const message = "students in a class retrieved succesfully";
      const data = {
        class: _.pick(findClass, [
          "_id",
          "grade",
          "subject",
          "students",
        ]),
      };
      return successResponse(res, 200, message, data);
    }
    return next({
      status: 404,
      error: "class not found in the database",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const getAllClassByStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.user._id).populate(
      "classes"
    );
    if (student) {
      const data = {
        student,
      };
      const message = "student classes retrieved succesfully";
      return successResponse(res, 200, message, data);
    }
    return next({
      status: 404,
      error: "Student not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const getAllClassByGrade = async (req, res, next) => {
  try {
    const { grade } = req.user;
    const classes = await Class.find({ grade }).populate({
      path: "lessons students",
      populate: { path: "resources comments" },
      select: [
        "-password",
        "-kind",
        "-isAdmin",
        "-isTeacher",
        "-__v",
        "-grade",
      ],
    });
    const message = "Classes retrieved successfully";
    const data = {
      classes,
    };
    return successResponse(res, 200, message, data);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
