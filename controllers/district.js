const { District } = require("../models");
const catchAsync = require("../middlewares/async");
const moment = require("moment");
const { createWebHook } = require("../utils/WebHook");

exports.getDistrictsList = catchAsync(async (req, res) => {
  const { id } = req.params;
  const list = await District.findAll({
    where: {
      ProvinceId: id,
    },
  });
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).send(list);
});
exports.getDetailDistrict = catchAsync(async (req, res) => {
  const { id } = req.params;
  const district = await District.findOne({
    where: {
      id,
    },
  });
  if (district) {
    res.status(200).send(district);
  } else {
    res.status(404).send("not found");
  }
});
exports.addDistrict = catchAsync(async (req, res) => {
  const district = req.body;
  const newDistrict = await District.create(district);
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).send(newDistrict);
});

exports.deleteDistrict = catchAsync(async (req, res) => {
  const { id } = req.params;
  const districtDelete = await District.findOne({
    where: {
      id,
    },
  });
  if (districtDelete) {
    District.destroy({
      where: {
        id,
      },
    });
    res.status(200).send(districtDelete);
  } else {
    res.status(404).send("not found");
  }
});
exports.updateDistrict = catchAsync(async (req, res) => {
  const { id } = req.params;
  const district = req.body;
  const districtUpdate = await District.findOne({
    where: {
      id,
    },
  });
  if (districtUpdate) {
    districtUpdate.Name = district.Name;
    districtUpdate.ProvinceId = district.ProvinceId;
    districtUpdate.Prefix = district.Prefix;
    districtUpdate.TentantId = district.TentantId;
    const districtUpdated = await districtUpdate.save();
    res.status(200).send(districtUpdated);
  } else {
    res.status(404).sned("not found");
  }
});
