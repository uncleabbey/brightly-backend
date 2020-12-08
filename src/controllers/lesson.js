import { Lesson, Class } from "../models/classes";
import successResponse from "../helpers/successResponse";

export const getAllLessons = async (req, res, next) => {
  try {
    const lessons = await Lesson.find({}).populate("class");
    const message = "lessons retrieved successfully";
    const data = {
      lessons,
    };
    return successResponse(res, 200, message, data);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
export const createLesson = async (req, res, next) => {
  try {
    const { title, body, week } = req.body;
    const { classId } = req.params;
    const lesson = new Lesson({
      body,
      title,
      week: Number(week),
    });
    lesson.class = classId;
    await lesson.save();
    await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { lessons: lesson.id } },
      { useFindAndModify: false }
    );
    const message = "lesson added successfully";
    const data = {
      lesson,
    };
    return successResponse(res, 201, message, data);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const getLessonsByForAClass = async (req, res, next) => {
  try {
    const lessons = await Lesson.find({
      class: req.params.classId,
    }).populate("class resources");
    const message = "lessons retrieved successfully";
    const data = {
      lessons,
    };
    return successResponse(res, 200, message, data);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
export const getLesson = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findOne({
      _id: lessonId,
    }).populate("class resources");
    if (lesson) {
      const message = "lesson retrieved successfully";
      const data = {
        lesson,
      };
      return successResponse(res, 200, message, data);
    }
    return next({
      status: 404,
      error: "Sorry lesson is  not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
export const editLesson = async (req, res, next) => {
  try {
    const { title, body, week } = req.body;
    const { lessonId } = req.params;
    const lesson = await Lesson.findOne({
      class: req.params.classId,
      _id: lessonId,
    });
    if (lesson) {
      lesson.title = title;
      lesson.body = body;
      lesson.week = week;
      lesson.save();
      const message = "lesson updated successfully";
      const data = {
        lesson,
      };
      return successResponse(res, 200, message, data);
    }
    return next({
      status: 404,
      error: "Sorry lesson is  not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const deleteLesson = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findOne({
      _id: lessonId,
    }).populate("class");
    if (lesson) {
      lesson.deleteOne();
      const message = "lesson deleted successfully";
      return successResponse(res, 200, message);
    }
    return next({
      status: 404,
      error: "Sorry lesson is  not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
