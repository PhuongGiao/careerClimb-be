const catchError = (err, req, res, next) => {
  // console.log(JSON.stringify(err, null, 2));

  if (err.name === "ValidationError") {
    const errors = err.errors;
    const keys = Object.keys(errors);
    const errorObj = {};
    keys.map((key) => {
      errorObj[key] = errors[key].message;
    });
    err.statusCode = 400;
    err.message = errorObj;
  }

  //bad ObjectID
  if (err.code === 11000) {
    err.statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    err.message = `${field} is duplicated`;
  }
  //duplicate
  if (err.kind === "ObjectId") {
    err.statusCode = 400;
    err.message = "Invalid ID";
  }

  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal error",
  });
};

module.exports = catchError;
