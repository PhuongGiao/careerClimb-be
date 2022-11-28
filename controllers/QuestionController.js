const { Question } = require("../models");
const catchAsync = require("../middlewares/async");

exports.createQuestion = catchAsync(async (req, res) => {
  const { question } = req.body;
  const post = await Question.create({
    question,
  });
  res.status(200).json({
    success: true,
    data: post,
  });
});
exports.getAllQuestion = catchAsync(async (req, res) => {
  const post = await Question.findAll({});
  res.status(200).json({
    success: true,
    data: post,
  });
});
