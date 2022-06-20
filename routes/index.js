const express = require("express");
const { router: districtRouter } = require("./districtRoute");
const { router: bookingUserRouter } = require("./bookingUserRoute");

const rootRouter = express.Router();

rootRouter.use("/district", districtRouter);
rootRouter.use("/booking-user", bookingUserRouter);

module.exports = {
  rootRouter,
};
