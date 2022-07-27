const { Province } = require("../models");
const catchAsync = require("../middlewares/async");
const moment = require("moment");
const { createWebHook } = require("../utils/WebHook");

exports.getProvincesList = catchAsync(async (req, res) => {
  const list = await Province.findAll();
  res.status(200).send(list);
});
exports.getDetailProvince = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const province = await Province.findOne({
    where: {
      Id,
    },
  });
  if (province) {
    res.status(200).send(province);
  } else {
    res.status(404).send("not found");
  }
});
exports.addProvince = catchAsync(async (req, res) => {
  const province = req.body;
  const newProvince = await Province.create(province);
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).send(newProvince);
});
exports.deleteProvince = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const provinceDelete = await Province.findOne({
    where: {
      Id,
    },
  });
  if (provinceDelete) {
    Province.destroy({
      where: {
        Id,
      },
    });
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(200).send(provinceDelete);
  } else {
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(404).send("not found");
  }
});
exports.updateProvince = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const provinceUpdate = req.body;
  const province = await Province.findOne({
    where: {
      Id,
    },
  });
  if (province) {
    province.Name = provinceUpdate.Name;
    province.Code = provinceUpdate.Code;
    province.TenantId = provinceUpdate.TenantId;
    const provinceUpdated = await province.save();
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(200).send(provinceUpdated);
  } else {
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(404).send("not found");
  }
});
