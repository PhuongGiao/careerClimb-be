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
  const booking = await StudioBooking.findByPk(id, {
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
  res.status(200).send(booking);
});

exports.updateBookingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {
    OrderByTime,
    OrderByTimeFrom,
    OrderByTimeTo,
    OrderByDateFrom,
    OrderByDateTo,
    PaymentType,
    OrderNote,
    BookingUserName,
    BookingPhone,
    BookingEmail,
    StudioRoomId,
    PromoCodeId,
    CreationTime,
    CreatorUserId,
    LastModificationTime,
    LastModifierUserId,
    IsDeleted,
    DeleterUserId,
    DeletionTime,
    EvidenceImage,
    IsPayDeposit,
  } = req.body;
  const data = await StudioBooking.update(
    {
      OrderByTime,
      OrderByTimeFrom,
      OrderByTimeTo,
      OrderByDateFrom,
      OrderByDateTo,
      PaymentType,
      OrderNote,
      BookingUserName,
      BookingPhone,
      BookingEmail,
      StudioRoomId,
      PromoCodeId,
      CreationTime,
      CreatorUserId,
      LastModificationTime,
      LastModifierUserId,
      IsDeleted,
      DeleterUserId,
      DeletionTime,
      EvidenceImage,
      IsPayDeposit,
    },
    {
      where: {
        id,
      },
    }
  );
  res.status(200).json({
    success: true,
    message: "Update success",
  });
});

exports.filterBooking = catchAsync(async (req, res) => {
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
    where,
  });
  res.status(200).send(listBooking);
});
