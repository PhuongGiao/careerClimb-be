const express = require("express");
const { router: userRoute } = require("./userRoute");
const { router: blogRoute } = require("./blogRoute");
const { router: categoryRoute } = require("./categoryRoute");
const { router: jobRoute } = require("./jobRoute");
const { router: levelRoute } = require("./levelRoute");
const { router: experienceRoute } = require("./experienceRoute");
const { router: locationRoute } = require("./locationRoute");
const { router: salaryRoute } = require("./salaryRoute");
const { router: employerRoute } = require("./employerRoute");
const { router: cvRoute } = require("./cvRoute");
const { router: applicationRoute } = require("./applicationRoute");

const rootRouter = express.Router();

rootRouter.use("/user", userRoute);
rootRouter.use("/blog", blogRoute);
rootRouter.use("/category", categoryRoute);
rootRouter.use("/job", jobRoute);
rootRouter.use("/level", levelRoute);
rootRouter.use("/experience", experienceRoute);
rootRouter.use("/location", locationRoute);
rootRouter.use("/salary", salaryRoute);
rootRouter.use("/employer", employerRoute);
rootRouter.use("/cv", cvRoute);
rootRouter.use("/application", applicationRoute);

module.exports = {
  rootRouter,
};
