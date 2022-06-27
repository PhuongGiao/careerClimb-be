const { StudioBooking, BookingUser, StudioRoom } = require("../models");
const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");
const moment = require("moment");
const { Op } = require("sequelize");
const ApiError = require("../utils/ApiError");

exports.getAllBooking = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const listBooking = await Pagination(StudioBooking, page, limit, {
    include: [
      {
        model: BookingUser,
        as: "user",
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
        as: "user",
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
    BookingStatus,
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
  const BookingStatuses = [
    "Chờ thực hiện",
    "Hoàn tất",
    "Đã huỷ",
    "Vắng mặt",
  ].map((val) => val.toLowerCase());
  if (!BookingStatuses.includes(BookingStatus.toLowerCase())) {
    throw new ApiError(
      500,
      "Wrong type of booking status'Chờ thực hiện','Hoàn tất','Đã huỷ','Vắng mặt',]"
    );
  }
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
      BookingStatus,
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
  const { OrderDate, IsPayDeposit, PaymentType, IsDeleted } = req.body;
  let where;
  if (!PaymentType) {
    where = {
      CreationTime: {
        [Op.gte]: OrderDate?.OrderByDateFrom
          ? moment(OrderDate.OrderByDateFrom).format()
          : 1,
        [Op.lte]: OrderDate?.OrderByDateTo
          ? moment(OrderDate.OrderByDateTo).format()
          : new Date(),
      },
      IsPayDeposit:
        IsPayDeposit !== undefined || null
          ? IsPayDeposit
          : {
              [Op.or]: [true, false],
            },
    };
  } else {
    where = {
      CreationTime: {
        [Op.gte]: CreationTime?.OrderByDateFrom
          ? moment(CreationTime.OrderByDateFrom).format()
          : 1,
        [Op.lte]: CreationTime?.OrderByDateTo
          ? moment(CreationTime.OrderByDateTo).format()
          : new Date(),
      },
      IsPayDeposit:
        IsPayDeposit !== undefined || null
          ? IsPayDeposit
          : {
              [Op.or]: [true, false],
            },
      PaymentType,
    };
  }
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
