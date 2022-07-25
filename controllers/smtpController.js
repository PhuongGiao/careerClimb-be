const { SMTP } = require("../models");
const catchAsync = require("../middlewares/async");

exports.getSMTP = catchAsync(async (req, res) => {
  const list = await SMTP.findAll({});
  res.status(200).send(list);
});
exports.getSMTPById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const list = await SMTP.findByPk(id);
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
  res.status(200).json({
    success: true,
    message: "update success",
  });
});
