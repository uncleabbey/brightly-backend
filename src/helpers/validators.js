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

// export const validateLoginSchema = (user) => {
//   const schema = Joi.object({
//     email: Joi.string().min(3).max(255).required().email(),
//     password: Joi.string().min(3).max(255).required(),
//   });
//   return schema.validate(user);
// };
