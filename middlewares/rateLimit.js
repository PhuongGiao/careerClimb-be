const rateLimit = require("express-rate-limit");

exports.limiter = (request, minutes) =>
  rateLimit({
    windowMs: minutes * 60 * 1000,
    max: request,
    message: "Sao may li vay",
    skipSuccessfulRequests: true,
  });
