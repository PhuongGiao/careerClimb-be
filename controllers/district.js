const { Province } = require("../models");
const catchAsync = require("../middlewares/async");

exports.getAllProvince = catchAsync(async (req, res) => {
  const listStation = await Province.findAll();
  res.status(200).send(listStation);
});
