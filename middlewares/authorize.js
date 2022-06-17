const ApiError = require("../utils/ApiError");

exports.authorize =
  (...roles) =>
  (req, res, next) => {
    const roleUser = req.user.role;
    if (!roleUser || !roles.includes(roleUser)) {
      throw new ApiError(403, "Access denied");
    }
    next();
  };
