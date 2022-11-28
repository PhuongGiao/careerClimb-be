const express = require("express");
const { router: patientRoute } = require("./patientRoute");
const { router: patientPostRoute } = require("./patientPostRoute");
const { router: doctorRoute } = require("./doctorRoute");
const { router: specialistRoute } = require("./specialistRoute");
const { router: tempurature } = require("./tempurature");
const { router: bookingRoute } = require("./bookingRoute");
const { router: questionRoute } = require("./questionRoute");
const { router: commentRoute } = require("./commentRoute");

const rootRouter = express.Router();
rootRouter.use("/patient", patientRoute);
rootRouter.use("/patient-post", patientPostRoute);
rootRouter.use("/doctor", doctorRoute);
rootRouter.use("/specialist", specialistRoute);
rootRouter.use("/tempurature", tempurature);
rootRouter.use("/booking", bookingRoute);
rootRouter.use("/question", questionRoute);
rootRouter.use("/comment", commentRoute);

module.exports = {
  rootRouter,
};
