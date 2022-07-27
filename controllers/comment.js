const { Comment } = require("../models");
const { Post } = require("../models");
const { createWebHook } = require("../utils/WebHook");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const moment = require("moment");

exports.createComment = catchAsync(async (req, res) => {
  const { PostId, Content } = req.body;
  if (!PostId || !Content) {
    throw new ApiError(500, "PostId && Content is required");
  }
  const BookingUserId = 5;
  const comment = await Comment.create({
    Content,
    BookingUserId,
    PostId,
  });
  const countComment = await Comment.count({ where: { PostId: PostId } });
  await Post.update({ TotalComments: countComment }, { where: { id: PostId } });
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).send(comment);
});

exports.getCommentsByPostId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.findAll({
    where: {
      PostId: id,
    },
  });
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).json({
    success: true,
    data: comments,
  });
});
