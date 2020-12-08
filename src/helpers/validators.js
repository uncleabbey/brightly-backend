import Joi from "joi";

export const validateStudentSchema = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    grade: Joi.string().valid("1", "2", "3", "4", "5"),
  });
  return schema.validate(user);
};
export const validatTeacherSchema = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    subject: Joi.string().required(),
  });
  return schema.validate(user);
};

export const validateLoginSchema = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
};
export const validateLessonSchema = (lesson) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    week: Joi.number().required(),
  });
  return schema.validate(lesson);
};
export const validateClassSchema = (classes) => {
  const schema = Joi.object({
    schedule: Joi.array().required(),
    grade: Joi.string().required(),
    subject: Joi.string().required(),
  });
  return schema.validate(classes);
};
export const validateTimeTableSchema = (classes) => {
  const schema = Joi.object({
    day: Joi.string.valid(
      "Monaday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ),
    grade: Joi.string().valid("1", "2", "3", "4", "5"),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
  });
  return schema.validate(classes);
};
