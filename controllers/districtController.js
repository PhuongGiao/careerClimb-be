const { District } = require("../models");
const catchAsync = require("../middlewares/async");
exports.createDistrict = catchAsync(async (req, res) => {
  const { Name, Prefix, ProvinceId, TenantId } = req.body;
  const newStation = await District.create({
    Name,
    Prefix,
    ProvinceId,
    TenantId,
  });
  console.log(newStation);
  res.status(201).send(newStation);
});

exports.getAllDistrict = catchAsync(async (req, res) => {
  const listStation = await District.findAll();
  res.status(200).send(listStation);
});
