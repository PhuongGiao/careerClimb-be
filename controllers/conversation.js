const { Conversation } = require("../models");
const catchAsync = require("../middlewares/async");

exports.createConversation = catchAsync(async (req, res) => {
  const data = await Conversation.create({});
  res.status(200).send(data);
});
