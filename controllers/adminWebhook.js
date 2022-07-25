const { AdminWebhook } = require("../models");
const catchAsync = require("../middlewares/async");
const moment = require("moment");
const { createWebHook } = require("../utils/WebHook");
const Pagination = require("../utils/pagination");
const { Op } = require("sequelize");

exports.getAllWebhook = catchAsync(async (req, res) => {
  const { page, limit, method } = req.query;
  const list = await Pagination(AdminWebhook, page, limit, {
    where: {
      Method: method
        ? {
            [Op.in]: [method.toUpperCase()],
          }
        : {
            [Op.notIn]: [""],
          },
    },
  });

  //   createWebHook(
  //     req.method,
  //     req.originalUrl,
  //     moment(Date.now()),
  //     JSON.stringify(req.body)
  //   );
  res.status(200).send(list);
});
