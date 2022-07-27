const { SMTP } = require("../models");
const catchAsync = require("../middlewares/async");
const moment = require("moment");
const { createWebHook } = require("../utils/WebHook");

exports.getSMTP = catchAsync(async (req, res) => {
  const list = await SMTP.findAll({});
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).send(list);
});
exports.getSMTPById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const list = await SMTP.findByPk(id);
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).send(list);
});
exports.createSMTP = catchAsync(async (req, res) => {
  const { Host, Service, Mail, Password } = req.body;
  const list = await SMTP.create({
    Host,
    Service,
    Mail,
    Password,
  });
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).send(list);
});
exports.updateSMTP = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Host, Service, Mail, Password } = req.body;
  await SMTP.update(
    {
      Host,
      Service,
      Mail,
      Password,
    },
    {
      where: {
        id,
      },
    }
  );
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).json({
    success: true,
    message: "update success",
  });
});
