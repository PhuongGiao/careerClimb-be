const express = require("express");
const { router: userRoute } = require("./userRoute");
const { router: patientRoute } = require("./patientRoute");

const rootRouter = express.Router();

rootRouter.use("/user", userRoute);
rootRouter.use("/patient", patientRoute);

module.exports = {
  rootRouter,
};
