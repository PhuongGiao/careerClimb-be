const { TempuratureHistory } = require("../models");
const catchAsync = require("../middlewares/async");
const moment = require("moment");
const { Op } = require("sequelize");
exports.getAlll = catchAsync(async (req, res) => {
  const data = await TempuratureHistory.findAll({});
  res.status(200).json({
    success: true,
    data,
  });
});
// const convertTimeSendDB = (time) => moment(time).subtract(7, "h");
exports.create = catchAsync(async (req, res) => {
  const { timeMesure, tempurature, note } = req.body;
  const userId = req.user.id;

  const startDay = new Date(timeMesure);
  const endDate = new Date(timeMesure);
  startDay.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(23, 59, 59, 999);

  const filter = await TempuratureHistory.findOne({
    where: {
      timeMesure: {
        [Op.lt]: endDate,
        [Op.gt]: startDay,
      },
      userId,
    },
  });

  let data;
  if (!filter) {
    data = await TempuratureHistory.create({
      timeMesure,
      tempurature,
      note,
      userId,
      averageTempurature: tempurature,
    });
  } else {
    await TempuratureHistory.update(
      {
        timeMesure,
        tempurature,
        note,
        averageTempurature:
          (filter.dataValues.averageTempurature + tempurature) / 2,
      },
      {
        where: {
          timeMesure: {
            [Op.lt]: endDate,
            [Op.gt]: startDay,
          },
          userId,
        },
      }
    );
  }

  res.status(200).json({
    success: true,
    data,
  });
});
exports.me = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const data = await TempuratureHistory.findAll({
    where: {
      userId,
    },
    order: [["timeMesure", "ASC"]],
  });
  res.status(200).json({
    success: true,
    data,
  });
});
