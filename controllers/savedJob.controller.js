const catchAsync = require("../middlewares/async");
const {
  Application,
  CV,
  Job,
  Employer,
  User,
  SavedJob,
  Location,
  Level,
  Category,
  Salary,
  Experience,
} = require("../models");
const { Op } = require("sequelize");
const ApiError = require("../utils/ApiError");
const MailSevice = require("../utils/MailService");

exports.getSavedJob = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const data = await SavedJob.findAll({
    where: { userId },
    include: [
      {
        model: Job,
        include: [
          { model: Level },
          { model: Category },
          { model: Salary },
          { model: Experience },
          { model: Location },
          {
            model: User,
            include: [{ model: Employer, as: "employerDetail" }],
          },
        ],
      },
    ],
  });
  res.status(200).json({
    success: true,
    data,
  });
});

exports.createSavedJob = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.body;
  if (!jobId) {
    throw new ApiError(500, "Please try again!!!");
  }
  const check = await SavedJob.findOne({
    where: {
      jobId,
      userId,
    },
  });
  if (check) {
    throw new ApiError(500, "Bạn đã lưu công việc này !!!");
  }
  const data = await SavedJob.create({ userId, jobId });
  res.status(200).json({
    success: true,
    data,
  });
});

exports.updateUnsaved = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.params;

  await SavedJob.destroy({
    where: {
      userId,
      jobId,
    },
  });
  res.status(200).json({
    success: true,
  });
});
