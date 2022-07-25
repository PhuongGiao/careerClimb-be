const { StudioRoom } = require("../models");
const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");
const moment = require("moment");
const { createWebHook } = require("../utils/WebHook");

exports.getAllRoom = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const list = await Pagination(StudioRoom, page, limit);
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).send(list);
});
