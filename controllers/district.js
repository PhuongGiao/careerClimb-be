const { Province } = require("../models");
const catchAsync = require("../middlewares/async");

exports.getAllProvince = catchAsync(async (req, res) => {
  const list = await Province.findAll();
  res.status(200).send(list);
});
