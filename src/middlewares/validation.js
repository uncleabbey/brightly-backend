import {
  validateLoginSchema,
  validateStudentSchema,
  validatTeacherSchema,
  validateLessonSchema,
  validateClassSchema,
  validateTimeTableSchema,
  validatePasswordSchema,
} from "../helpers/validators";

export const validatStudentBody = (req, res, next) => {
  const error = validateStudentSchema(req.body);
  if (error.error) {
    return next({
      status: 400,
      error: error.error.details[0].message,
    });
  }
  return next();
};
export const validatTeacherBody = (req, res, next) => {
  const error = validatTeacherSchema(req.body);
  if (error.error) {
    return next({
      status: 400,
      error: error.error.details[0].message,
    });
  }
  return next();
};
export const validateLoginBody = (req, res, next) => {
  const error = validateLoginSchema(req.body);
  if (error.error) {
    return next({
      status: 400,
      error: error.error.details[0].message,
    });
  }
  return next();
};
export const validatePasswordBody = (req, res, next) => {
  const error = validatePasswordSchema(req.body);
  if (error.error) {
    return next({
      status: 400,
      error: error.error.details[0].message,
    });
  }
  return next();
};
export const validateLessonBody = (req, res, next) => {
  const error = validateLessonSchema(req.body);
  if (error.error) {
    return next({
      status: 400,
      error: error.error.details[0].message,
    });
  }
  return next();
};
export const validateClassBody = (req, res, next) => {
  const error = validateClassSchema(req.body);
  if (error.error) {
    return next({
      status: 400,
      error: error.error.details[0].message,
    });
  }
  return next();
};
export const validateTimeTableBody = (req, res, next) => {
  const error = validateTimeTableSchema(req.body);
  if (error.error) {
    return next({
      status: 400,
      error: error.error.details[0].message,
    });
  }
  return next();
};
