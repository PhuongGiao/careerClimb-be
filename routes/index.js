const express = require("express");
const { router: districtRouter } = require("./districtRoute");
const { router: patientRoute } = require("./patientRoute");
const { router: patientPostRoute } = require("./patientPostRoute");
const { router: doctorRoute } = require("./doctorRoute");
const { router: specialistRoute } = require("./specialistRoute");

const rootRouter = express.Router();
rootRouter.use("/districts", districtRouter);
rootRouter.use("/patient", patientRoute);
rootRouter.use("/patient-post", patientPostRoute);
rootRouter.use("/doctor", doctorRoute);
rootRouter.use("/specialist", specialistRoute);

module.exports = {
  rootRouter,
};
