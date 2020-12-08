import successResponse from "../helpers/successResponse";

const { TimeTable } = require("../models/classes");

export const getAllTimeTable = async (req, res, next) => {
  try {
    const timeTable = await TimeTable.find().populate("class");
    const message = "Time table retireved successfully";
    const data = {
      timeTable,
    };
    return successResponse(res, 200, message, data);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const addTimeTable = async (req, res, next) => {
  try {
    const { grade, day, endTime, startTime, classId } = req.body;
    const timeTable = new TimeTable({
      grade,
      day,
      endTime,
      startTime,
      class: classId,
    });
    // timeTable.(classId);
    await timeTable.save();
    const data = {
      timeTable,
    };
    const message = "Timetable created successfully";
    return successResponse(res, 201, message, data);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const editTimeTable = async (req, res, next) => {
  try {
    const timetable = await TimeTable.findById(req.params.id);
    if (timetable) {
      const { grade, day, endTime, startTime } = req.body;
      timetable.grade = grade;
      timetable.day = day;
      timetable.endTime = endTime;
      timetable.startTime = startTime;
      await timetable.save();
      const data = {
        timetable,
      };
      const message = "Timetable editted successfully";
      return successResponse(res, 200, message, data);
    }
    return next({
      status: 404,
      error: "not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
export const deleteTimeTable = async (req, res, next) => {
  try {
    const timetable = await TimeTable.findById(req.params.id);
    if (timetable) {
      timetable.deleteOne();
      const message = "Timetable deleted successfully";
      return successResponse(res, 200, message);
    }
    return next({
      status: 404,
      error: "not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const getTableById = async (req, res, next) => {
  try {
    const timetable = await TimeTable.findById(
      req.params.id
    ).populate("class");
    if (timetable) {
      const data = { timetable };
      const message = "Timetable deleted successfully";
      return successResponse(res, 200, message, data);
    }
    return next({
      status: 404,
      error: "not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const getTimeTableByGrade = async (req, res, next) => {
  try {
    const { grade } = req.params;
    const timetables = await TimeTable.find({ grade }).populate(
      "class"
    );
    const data = { timetables };

    const message = "Timetable by grades retrieved successfully";
    return successResponse(res, 200, message, data);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
