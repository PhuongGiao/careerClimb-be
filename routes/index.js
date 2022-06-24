const express = require("express");
const { router: districtRouter } = require("./districtRoute");
const { router: bookingUserRouter } = require("./bookingUserRoute");
const { router: studioPostRouter } = require("./studioPostRoute");
const { router: registerPartnerRouter } = require("./registerPartnerRoute");
const { router: bookingRouter } = require("./bookingRoute");
const { router: filterRouter } = require("./filterRoute");

const rootRouter = express.Router();

rootRouter.use("/province", districtRouter);
rootRouter.use("/booking-user", bookingUserRouter);
rootRouter.use("/studio-post", studioPostRouter);
rootRouter.use("/register-partner", registerPartnerRouter);
rootRouter.use("/booking", bookingRouter);
rootRouter.use("/filter", filterRouter);

module.exports = {
  rootRouter,
};
