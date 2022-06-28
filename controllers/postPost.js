const { AppBinaryObject } = require("../models");
const catchAsync = require("../middlewares/async");

exports.postPost = catchAsync(async (req, res) => {
  const data = await AppBinaryObject.create({
    Bytes: req.file.buffer,
    Description: req.file.originalname,
  });
  res.status(200).json({
    ...data,
  });
});

exports.getPost = catchAsync(async (req, res) => {
  const data = await AppBinaryObject.findByPk(
    "22bc696a-710c-4b02-9f21-80698c650595"
  );
  res.status(200).json({
    ...data,
  });
});
