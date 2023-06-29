const catchAsync = require("../middlewares/async");
const { Level } = require("../models");
const ApiError = require("../utils/ApiError");

exports.getAll = catchAsync(async (req, res) => {
  const data = await Level.findAll();
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Level.findByPk(id);
  if (!data) {
    throw new ApiError(404, "Level not found!!!");
  }
  res.status(200).json(data);
});

exports.create = catchAsync(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(500, "Level is required!");
  }
  const check = await Level.findOne({
    where: {
      name,
    },
  });
  if (check) throw new ApiError(500, "Level is duplicated!");
  const data = await Level.create({
    name,
  });
  res.status(200).json({
    success: true,
    data,
  });
});
