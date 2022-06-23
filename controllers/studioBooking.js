const { StudioBooking, BookingUser, StudioRoom } = require("../models");
const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");

exports.getAllBooking = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const listBooking = await Pagination(StudioBooking, page, limit, {
    include: [
      {
        model: BookingUser,
        as: "userId",
      },
      {
        model: StudioRoom,
      },
    ],
  });
  res.status(200).send(listBooking);
});

exports.getBookingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const booking = await StudioBooking.findByPk(id);
  res.status(200).send(booking);
});
