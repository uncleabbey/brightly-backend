import {
  validateLoginSchema,
  validateStudentSchema,
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
