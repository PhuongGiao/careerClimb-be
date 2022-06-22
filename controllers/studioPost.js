const { StudioPost } = require("../models");
const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");

exports.getAllStudioPost = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const data = await Pagination(StudioPost, page, limit);
  res.status(200).json({ ...data });
});

exports.getDetailStation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const detail = await Station.findAll({
    where: {
      id,
    },
  });
  res.status(200).send(detail);
});

exports.updateStation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, address, province } = req.body;
  const stationUpdate = await Station.findOne({
    where: {
      id,
    },
  });
  stationUpdate.name = name;
  stationUpdate.address = address;
  stationUpdate.province = province;
  await stationUpdate.save();
  res.status(200).send(stationUpdate);
});

exports.deleteStation = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Station.destroy({
    where: {
      id,
    },
  });
  res.status(200).send("Delete Success!");
});
