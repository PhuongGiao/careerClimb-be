const catchAsync = require("../middlewares/async");
const { Blog, User, Employer } = require("../models");
const ApiError = require("../utils/ApiError");

exports.getAll = catchAsync(async (req, res) => {
  const data = await Blog.findAll();
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getAllByEmployer = catchAsync(async (req, res) => {
  let userId = req.user.id;
  const data = await Blog.findAll({
    where: {
      userId,
    },
  });
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  //   const data = await Blog.findOne({
  //     where: { id },
  //   });
  const data = await Blog.findByPk(id, {
    include: [
      { model: User, include: { model: Employer, as: "employerDetail" } },
    ],
  });
  if (!data) {
    throw new ApiError(404, "Blog not found!!!");
  }
  res.status(200).json(data);
});
exports.create = catchAsync(async (req, res) => {
  let userId = req.user.id;
  const { title, content, image, isApprove = true } = req.body;
  if (!title) {
    throw new ApiError(500, "Title is required!");
  }
  if (!content) {
    throw new ApiError(500, "Content is required!");
  }

  const check = await Blog.findOne({
    where: {
      title,
    },
  });
  if (check) throw new ApiError(500, "Title is duplicated!");
  const data = await Blog.create({
    title,
    content,
    image,
    userId,
    isApprove,
  });
  res.status(200).json({
    success: true,
    data,
  });
});
