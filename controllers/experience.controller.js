const catchAsync = require("../middlewares/async");
const { Experience } = require("../models");
const ApiError = require("../utils/ApiError");

exports.getAll = catchAsync(async (req, res) => {
  const data = await Experience.findAll();
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Experience.findByPk(id);
  if (!data) {
    throw new ApiError(404, "Experience not found!!!");
  }
  res.status(200).json(data);
});

exports.create = catchAsync(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(500, "Experience is required!");
  }
  const check = await Experience.findOne({
    where: {
      name,
    },
  });
  if (check) throw new ApiError(500, "Experience is duplicated!");
  const data = await Experience.create({
    name,
  });
  res.status(200).json({
    success: true,
    data,
  });
});
