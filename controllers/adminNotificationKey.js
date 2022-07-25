const { AdminNotificationKey } = require("../models");
const catchAsync = require("../middlewares/async");
const moment = require("moment");
const { createWebHook } = require("../utils/WebHook");

exports.updateAdminNotificationKey = catchAsync(async (req, res) => {
  const { GoogleApiFCM, AuthKey, P12Password, P12BundleId } = req.body;
  await AdminNotificationKey.update(
    {
      GoogleApiFCM,
      AuthKey,
      P12Certificate: req.file.buffer,
      P12Password,
      P12BundleId,
    },
    { where: { id: 1 } }
  );
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).json({
    success: true,
    message: "Updated",
  });
});
