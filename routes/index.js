const express = require("express");
const { router: userRoute } = require("./userRoute");

const rootRouter = express.Router();

rootRouter.use("/user", userRoute);

module.exports = {
  rootRouter,
};
