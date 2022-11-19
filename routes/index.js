const express = require("express");
const { router: districtRouter } = require("./districtRoute");
const { router: patientRoute } = require("./patientRoute");
const { router: patientPostRoute } = require("./patientPostRoute");

const rootRouter = express.Router();
rootRouter.use("/districts", districtRouter);
rootRouter.use("/patient", patientRoute);
rootRouter.use("/patient-post", patientPostRoute);

module.exports = {
  rootRouter,
};
