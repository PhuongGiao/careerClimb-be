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
