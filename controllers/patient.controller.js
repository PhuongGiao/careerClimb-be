const catchAsync = require("../middlewares/async");
const { User, PatientDetail } = require("../models");
const ApiError = require("../utils/ApiError");

exports.createPaientDetail = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { weight, height, healthStatus, medicalHistory } = req.body;

  const check = await PatientDetail.findOne({ where: userId });
  if (check) {
    await PatientDetail.update(
      {
        weight,
        height,
        healthStatus,
        medicalHistory,
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
  const data = await PatientDetail.create({
    userId,
    weight,
    height,
    healthStatus,
    medicalHistory,
  });
  res.json({
    success: true,
    data,
  });
});
exports.updatePaientDetail = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const check = await PatientDetail.findOne({ where: userId });
  if (!check) throw new ApiError(500, "Not existed");

  res.json({
    success: true,
  });
});
