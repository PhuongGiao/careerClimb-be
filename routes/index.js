const express = require("express");
const { router: userRoute } = require("./userRoute");
const { router: patientRoute } = require("./patientRoute");
const { router: doctorRoute } = require("./doctorRoute");

const rootRouter = express.Router();

rootRouter.use("/user", userRoute);
rootRouter.use("/patient", patientRoute);
rootRouter.use("/doctor", doctorRoute);

module.exports = {
  rootRouter,
};
