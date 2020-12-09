export default (req, res, next) => {
  const { user } = req;
  if (!user.isTeacher) {
    return next({
      status: 401,
      error: "Sorry only teacher can create classes",
    });
  }
  return next();
};
