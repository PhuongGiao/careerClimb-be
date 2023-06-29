const { Op } = require("sequelize");
const catchAsync = require("../middlewares/async");
const { Employer, User } = require("../models");
const ApiError = require("../utils/ApiError");

exports.getAll = catchAsync(async (req, res) => {
  // const { q } = req.query;
  const data = await Employer.findAll({
    // where: {
    //   name: {
    //     [Op.like]: q !== "" ? `%${q}%` : "%%",
    //   },
    // },
  });
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  //   const data = await Employer.findOne({
  //     where: { id },
  //   });
  const data = await Employer.findByPk(id, {
    include: [{ model: User }],
  });
  if (!data) {
    throw new ApiError(404, "Employer not found!!!");
  }
  res.status(200).json(data);
});
exports.create = catchAsync(async (req, res) => {
  const { name, description, address, image } = req.body;
  if (!(name || description || address || image)) {
    throw new ApiError(500, "Missing some fields!");
  }
  const userId = req.user.id;
  const check = await Employer.findOne({
    where: {
      name,
    },
  });
  if (check) throw new ApiError(500, "Employer is duplicated!");

  const data = await Employer.create({
    name,
    description,
    address,
    image,
    userId,
  });
  res.status(200).json({
    success: true,
    data,
  });
});
exports.updateEmployer = catchAsync(async (req, res) => {
  let userId = req.user.id;
  await Employer.update(req.body, {
    where: {
      id: userId,
    },
  });
  res.status(200).json({
    success: true,
  });
});
