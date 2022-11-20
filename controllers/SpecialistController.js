const catchAsync = require("../middlewares/async");
const { Specialist } = require("../models");

exports.createSpecialist = catchAsync(async (req, res) => {
  const { name, description } = req.body;

  const check = await Specialist.findAll({
    where: {
      name,
    },
  });
  if (check.length > 0) throw new ApiError(400, "This name is already taken");

  const data = await Specialist.create({
    name,
    description,
  });

  res.status(200).json({
    success: true,
    data,
  });
});
exports.getAlll = catchAsync(async (req, res) => {
  const data = await Specialist.findAll({});
  res.status(200).json({
    success: true,
    data,
  });
});
