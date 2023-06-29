const catchAsync = require("../middlewares/async");
const { Salary } = require("../models");
const ApiError = require("../utils/ApiError");

exports.getAll = catchAsync(async (req, res) => {
  const data = await Salary.findAll();
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Salary.findByPk(id);
  if (!data) {
    throw new ApiError(404, "Salary not found!!!");
  }
  res.status(200).json(data);
});

exports.create = catchAsync(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(500, "Salary is required!");
  }
  const check = await Salary.findOne({
    where: {
      name,
    },
  });
  if (check) throw new ApiError(500, "Salary is duplicated!");
  const data = await Salary.create({
    name,
  });
  res.status(200).json({
    success: true,
    data,
  });
});
