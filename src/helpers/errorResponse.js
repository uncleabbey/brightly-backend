const errorResponse = (res, error) => {
  const { status, error: err } = error;
  res.status(status || 500);
  return res.json({
    status: "error",
    error: err,
  });
};

export default errorResponse;
