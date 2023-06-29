const catchAsync = require("../middlewares/async");
const { Location } = require("../models");
const ApiError = require("../utils/ApiError");

exports.getAll = catchAsync(async (req, res) => {
  const data = await Location.findAll();
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Location.findByPk(id);
  if (!data) {
    throw new ApiError(404, "Location not found!!!");
  }
  res.status(200).json(data);
});

exports.create = catchAsync(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(500, "Location is required!");
  }
  const check = await Location.findOne({
    where: {
      name,
    },
  });
  if (check) throw new ApiError(500, "Location is duplicated!");
  const data = await Location.create({
    name,
  });
  res.status(200).json({
    success: true,
    data,
  });
});
