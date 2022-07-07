const { ScheduleAndPriceStudioByDate } = require("../models");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");
const { StudioRoom } = require("../models");

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
exports.getRoomSchedule = catchAsync(async (req, res) => {
  const { roomId, monthAndYear } = req.query;
  const month = monthAndYear.split("-")[0];
  const year = monthAndYear.split("-")[1];
  if (
    +month > 12 ||
    +month < 1 ||
    +year > 9999 ||
    +year < 1000 ||
    monthAndYear.split("-").length !== 2
  ) {
    throw new ApiError(500, "Invalid month or year, please check again !!!");
  }
  const room = await StudioRoom.findByPk(roomId);
  if (!room) {
    throw new ApiError(404, "Room not found");
  }
  const schedule = await ScheduleAndPriceStudioByDate.findAll({
    where: {
      Date: {
        [Op.like]: `%${monthAndYear}%`,
      },
      RoomId: +roomId,
    },
  });
  if (
    !schedule.length &&
    year >= new Date().getFullYear() &&
    month >= new Date().getMonth() + 1
  ) {
    const days = daysInMonth(month, year);
    await Promise.all(
      new Array(days).fill("").map(async (val, idx) => {
        return await ScheduleAndPriceStudioByDate.create({
          Date: `${idx + 1}-${monthAndYear}`,
          Open: true,
          RoomId: +roomId,
          PriceByDate: room.dataValues.PriceByDate,
          PriceByHour: room.dataValues.PriceByHour,
          FreeCancelByDate: "Trước 5 ngày",
          FreeCancelByHour: "Trước 3 ngày",
          CancelPriceByDate: 100,
          CancelPriceByHour: 100,
          AbsentPriceByDate: 100,
          AbsentPriceByHour: 100,
          PaymentByDate: true,
          PaymentByHour: true,
          DepositByDate: 30,
          DepositByHour: 50,
        });
      })
    );
    const schedule = await ScheduleAndPriceStudioByDate.findAll({
      where: {
        Date: {
          [Op.like]: `%${monthAndYear}%`,
        },
        RoomId: +roomId,
      },
    });
    return res.status(200).json({
      success: true,
      data: schedule,
    });
  } else if (schedule.length) {
    return res.status(200).json({
      success: true,
      data: schedule,
    });
  } else {
    throw new ApiError(404, "Data not found");
  }
});
