const { Op } = require("sequelize");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const { CV, Job, Employer, User, Application } = require("../models");

exports.create = catchAsync(async (req, res) => {
  const { cvName, cv, email, name, introduction, phone } = req.body;
  const userId = req.user.id;
  const data = await CV.create({
    cv,
    email,
    name,
    introduction,
    phone,
    userId,
    cvName,
  });
  //   await job.addLocation(location);
  res.status(200).json({
    success: true,
    data,
  });
});
exports.apply = catchAsync(async (req, res) => {
  const { cvId, jobId } = req.body;
  const cv = await CV.findOne({
    where: {
      id: cvId,
    },
  });
  const job = await Job.findOne({
    where: {
      id: jobId,
    },
  });

  if (!(cvId && jobId)) {
    throw new ApiError(500, "Something went wrong !");
  }
  // await job.addCV(cv);
  await Application.create(jobId, cvId);
  res.status(200).json({
    success: true,
  });
});
exports.myCVs = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const data = await CV.findAll({
    where: {
      userId,
    },
    include: [
      // {
      //   model: Job,
      //   include: [
      //     { model: User, include: [{ model: Employer, as: "employerDetail" }] },
      //   ],
      // },
      {
        model: Application,
        include: [
          {
            model: Job,
            include: {
              model: User,
              include: { model: Employer, as: "employerDetail" },
            },
          },
          { model: CV },
        ],
      },
    ],
  });
  res.status(200).json({
    success: true,
    data,
  });
});
