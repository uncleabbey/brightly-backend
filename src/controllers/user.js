import bcrypt from "bcryptjs";
import _ from "lodash";
import successResponse from "../helpers/successResponse";

import { User, Student, Teacher } from "../models";

export const registerStudent = async (req, res, next) => {
  const { email, password, firstName, lastName, grade } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return next({ status: 400, error: "Sorry User already exist" });
    }
    user = new Student({
      email,
      password,
      firstName,
      lastName,
      grade,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthKey();
    const message = "student created successfully";
    const data = {
      token,
      user: _.pick(user, [
        "_id",
        "email",
        "firstName",
        "lastName",
        "grade",
        "isAdmin",
        "isTeacher",
      ]),
    };
    return successResponse(res, 201, message, data);
  } catch (error) {
    return next({ status: 500, error });
  }
};
export const registerTeacher = async (req, res, next) => {
  const { email, password, firstName, lastName, subject } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return next({ status: 400, error: "Sorry User already exist" });
    }
    user = new Teacher({
      email,
      password,
      firstName,
      lastName,
      subject,
    });
    const salt = await bcrypt.genSalt(10);
    user.isTeacher = true;
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthKey();
    const message = "Teacher created successfully";
    const data = {
      token,
      user: _.pick(user, [
        "_id",
        "email",
        "firstName",
        "lastName",
        "subject",
        "isAdmin",
        "isTeacher",
      ]),
    };
    return successResponse(res, 201, message, data);
  } catch (error) {
    return next({ status: 500, error });
  }
};
