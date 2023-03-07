const catchAsync = require("../middlewares/async");
const { DoctorDetail } = require("../models");
const ApiError = require("../utils/ApiError");

exports.createDoctorDetail = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { experiences, graduated, introduction, skill } = req.body;

  const check = await DoctorDetail.findOne({ where: { userId } });
  console.log(
    "🚀 ~ file: doctor.controller.js:10 ~ exports.createDoctorDetail=catchAsync ~ check:",
    check
  );
  if (check) {
    await DoctorDetail.update(
      {
        experiences,
        graduated,
        introduction,
        skill,
      },
      {
        where: {
          userId,
        },
      }
    );
    return res.json({
      success: true,
    });
  }
  const data = await DoctorDetail.create({
    userId,
    experiences,
    graduated,
    introduction,
    skill,
  });
  res.json({
    success: true,
    data,
  });
});
exports.updateDoctorDetail = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const check = await DoctorDetail.findOne({ where: userId });
  if (!check) throw new ApiError(500, "Not existed");

  res.json({
    success: true,
  });
});
