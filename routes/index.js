const express = require("express");
const { router: districtRouter } = require("./districtRoute");
const { router: bookingUserRouter } = require("./bookingUserRoute");
const { router: studioPostRouter } = require("./studioPostRoute");
const { router: registerPartnerRouter } = require("./registerPartnerRoute");
const { router: bookingRouter } = require("./bookingRoute");
const { router: filterRouter } = require("./filterRoute");
const { router: room } = require("./roomRoute");
const { router: postPostRoute } = require("./postRoute");
const { router: ratingReportRoute } = require("./RatingReportRoute");
const { router: adminNotificationRoute } = require("./adminNotificationRoute");
const { router: commentRoute } = require("./commentRoute");
const { router: likeRoute } = require("./likeRoute");
const { router: scheduleRoute } = require("./scheduleRoute");
const { router: authRoute } = require("./authRoute");

const rootRouter = express.Router();

rootRouter.use("/province", districtRouter);
rootRouter.use("/booking-user", bookingUserRouter);
rootRouter.use("/studio-post", studioPostRouter);
rootRouter.use("/register-partner", registerPartnerRouter);
rootRouter.use("/booking", bookingRouter);
rootRouter.use("/filter", filterRouter);
rootRouter.use("/room", room);
rootRouter.use("/post-post", postPostRoute);
rootRouter.use("/rating&report", ratingReportRoute);
rootRouter.use("/notification", adminNotificationRoute);
rootRouter.use("/comment", commentRoute);
rootRouter.use("/like", likeRoute);
rootRouter.use("/schedule", scheduleRoute);
rootRouter.use("/auth", authRoute);

module.exports = {
  rootRouter,
};
