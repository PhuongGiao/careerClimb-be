const { AdminNotificationKey } = require("../models");
const catchAsync = require("../middlewares/async");

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
  res.status(200).json({
    success: true,
    message: "Updated",
  });
});
