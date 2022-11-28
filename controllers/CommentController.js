const { Comment } = require("../models");
const catchAsync = require("../middlewares/async");
const moment = require("moment");

exports.createComment = catchAsync(async (req, res) => {
  const { comment, postId } = req.body;
  const { name, isDoctor, userId } = req.user;
  const data = await Comment.create({
    name,
    isDoctor,
    userId,
    comment,
    postId,
  });

  res.status(200).json({
    success: true,
    data,
  });
});
