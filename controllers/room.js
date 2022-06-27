const { StudioRoom } = require("../models");
const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");

exports.getAllRoom = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const list = await Pagination(StudioRoom, page, limit);
  res.status(200).send(list);
});
