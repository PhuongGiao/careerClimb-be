const { Booking, BookingStatus, Doctor, Patient } = require("../models");
const catchAsync = require("../middlewares/async");
const moment = require("moment");
const schedule = require("node-schedule");

exports.getallMyBooking = catchAsync(async (req, res) => {
  const { bookingStatus } = req.query;
  const user = req.user;
  let data;
  if (user.isDoctor) {
    data = await Booking.findAll({
      where: {
        doctorId: req.user.id,
        bookingStatus,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Doctor,
          attributes: ["id", "name", "avatar"],
          as: "doctor",
        },
        {
          model: Patient,
          attributes: ["id", "name"],
          as: "patient",
        },
      ],
    });
  } else {
    data = await Booking.findAll({
      where: {
        patientId: req.user.id,
        bookingStatus,
      },
      include: [
        {
          model: Doctor,
          attributes: ["id", "name", "avatar"],
          as: "doctor",
        },
        {
          model: Patient,
          attributes: ["id", "name"],
          as: "patient",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.createBooking = catchAsync(async (req, res) => {
  const { doctorId, bookingFrom, bookingTo } = req.body;
  const patientId = req.user.id;
  const data = await Booking.create({
    doctorId,
    bookingFrom,
    bookingTo,
    bookingStatus: 1,
    bookingValue: 0,
    patientId,
  });

  const bookingToValue = moment(data.dataValues.bookingTo.toISOString()).format(
    "YYYY-MM-DD HH:mm:ss"
  );

  const completedTaskSchedule = schedule.scheduleJob(
    {
      date: moment(bookingToValue).date(),
      month: moment(bookingToValue).month(),
      year: moment(bookingToValue).year(),
      hour: moment(bookingToValue).hours(),
      minute: moment(bookingToValue).minutes(),
    },
    async () => {
      const temp = await Booking.update(
        {
          bookingStatus: 2,
        },
        {
          where: {
            id: data.dataValues.id,
          },
        }
      );
      if (temp) {
        completedTaskSchedule.cancel();
      }
    }
  );

  res.status(200).json({
    success: true,
    data,
  });
});
exports.cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Booking.update(
    {
      bookingStatus: 3,
    },
    {
      where: {
        id,
      },
    }
  );
  res.status(200).json({
    success: true,
  });
});
exports.createBookingStatus = catchAsync(async (req, res) => {
  const { name } = req.body;
  const data = await BookingStatus.create({
    name,
  });
  res.status(200).json({
    success: true,
    data,
  });
});
