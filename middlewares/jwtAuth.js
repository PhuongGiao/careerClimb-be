const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

exports.jwtAuth = (req, res, next) => {
  const headToken = req.headers.authorization;
  if (!headToken) {
    throw new ApiError(401, "Unauthoriezed");
  }
  const token = headToken.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Unauthoriezed");
  }
  try {
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;
    next();
  } catch (error) {
    if ((error.name = "TokenExpiredError")) {
      throw new ApiError(401, "Token is expired");
    }
    throw new ApiError(401, "Unauthoriezed");
  }
};
