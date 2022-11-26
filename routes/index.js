const express = require("express");
const { router: patientRoute } = require("./patientRoute");
const { router: patientPostRoute } = require("./patientPostRoute");
const { router: doctorRoute } = require("./doctorRoute");
const { router: specialistRoute } = require("./specialistRoute");
const { router: tempurature } = require("./tempurature");

const rootRouter = express.Router();
rootRouter.use("/patient", patientRoute);
rootRouter.use("/patient-post", patientPostRoute);
rootRouter.use("/doctor", doctorRoute);
rootRouter.use("/specialist", specialistRoute);
rootRouter.use("/tempurature", tempurature);

module.exports = {
  rootRouter,
};
