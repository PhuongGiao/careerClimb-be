const { Op } = require("sequelize");
const catchAsync = require("../middlewares/async");
const {
  Category,
  Job,
  Level,
  Experience,
  Salary,
  Location,
  User,
  Employer,
} = require("../models");
const ApiError = require("../utils/ApiError");

exports.getAll = catchAsync(async (req, res) => {
  const { q } = req.query;
  const data = await Category.findAll({
    where: {
      name: {
        [Op.like]: q !== "" ? `%${q}%` : "%%",
      },
    },
    include: [
      {
        model: Job,
        as: "jobs",
        include: [
          { model: Level },
          { model: Category },
          { model: Experience },
          { model: Salary },
          { model: Location },
          { model: User, include: { model: Employer, as: "employerDetail" } },
        ],
      },
    ],
  });
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Category.findByPk(id, {
    include: [
      {
        model: Job,
        as: "jobs",
        include: [
          { model: Level },
          { model: Category },
          { model: Experience },
          { model: Salary },
          { model: Location },
          { model: User, include: { model: Employer, as: "employerDetail" } },
        ],
      },
    ],
  });
  if (!data) {
    throw new ApiError(404, "Category not found!!!");
  }
  res.status(200).json(data);
});

exports.create = catchAsync(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(500, "Category is required!");
  }
  const check = await Category.findOne({
    where: {
      name,
    },
  });
  if (check) throw new ApiError(500, "Category is duplicated!");
  const data = await Category.create({
    name,
  });
  res.status(200).json({
    success: true,
    data,
  });
});
