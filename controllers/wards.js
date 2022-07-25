const { Ward } = require("../models");
const catchAsync = require("../middlewares/async");
const moment = require("moment");
const { createWebHook } = require("../utils/WebHook");

exports.getWardsList = catchAsync(async (req, res) => {
  const { id } = req.params;
  const list = await Ward.findAll({
    where: {
      DistrictId: id,
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
exports.getDetailWard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const ward = await Ward.findOne({
    where: {
      id,
    },
  });
  if (ward) {
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(200).send(ward);
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
exports.addWard = catchAsync(async (req, res) => {
  const ward = req.body;
  const newWard = await Ward.create(ward);
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).send(newWard);
});

exports.deleteWard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const wardDelete = await Ward.findOne({
    where: {
      id,
    },
  });
  if (wardDelete) {
    Ward.destroy({
      where: {
        id,
      },
    });
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(200).send(wardDelete);
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
exports.updateWard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const wardUpdate = req.body;
  const ward = await Ward.findOne({
    where: {
      id,
    },
  });
  if (ward) {
    ward.Name = wardUpdate.Name;
    ward.DistrictId = wardUpdate.DistrictId;
    ward.ProvinceId = wardUpdate.ProvinceId;
    ward.Prefix = wardUpdate.Prefix;
    const wardUpdated = await ward.save();
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(200).send(wardUpdated);
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
