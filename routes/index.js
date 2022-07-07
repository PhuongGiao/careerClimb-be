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
const { router: adminNotificationKey } = require("./adminNotificationKey");
const { verifyToken } = require("../middlewares/verifyToken");

const rootRouter = express.Router();

rootRouter.use("/province", verifyToken, districtRouter);
rootRouter.use("/booking-user", verifyToken, bookingUserRouter);
rootRouter.use("/studio-post", verifyToken, studioPostRouter);
rootRouter.use("/register-partner", verifyToken, registerPartnerRouter);
rootRouter.use("/booking", verifyToken, bookingRouter);
rootRouter.use("/filter", verifyToken, filterRouter);
rootRouter.use("/room", verifyToken, room);
rootRouter.use("/post-post", verifyToken, postPostRoute);
rootRouter.use("/rating&report", verifyToken, ratingReportRoute);
rootRouter.use("/notification", verifyToken, adminNotificationRoute);
rootRouter.use("/comment", verifyToken, commentRoute);
rootRouter.use("/like", verifyToken, likeRoute);
rootRouter.use("/schedule", verifyToken, scheduleRoute);
rootRouter.use("/notification-key", verifyToken, adminNotificationKey);
rootRouter.use("/auth", authRoute);

module.exports = {
  rootRouter,
};
