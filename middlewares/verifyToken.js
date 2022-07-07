const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies.access_token);
  if (!token) {
    throw new ApiError("401", "You are not authenticated!");
  }
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) throw new ApiError("401", "Token is not valid!");
    if (req.user.isAdmin) {
      next();
    } else {
      throw new ApiError("403", "You are not authorized!");
    }
  });
};
