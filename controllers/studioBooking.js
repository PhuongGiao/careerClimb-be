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
  const BookingStatuses = [0, 1, 2, 3];
  if (!BookingStatuses.includes(BookingStatus)) {
    throw new ApiError(500, "Wrong type of booking status 0,1,2,3]");
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
  const { OrderByDateFrom, IsPayDeposit, PaymentType, IsDeleted } = req.body;
  let where;
  if (
    !OrderByDateFrom.OrderByDateFrom &&
    !OrderByDateFrom.OrderByDateTo &&
    !IsPayDeposit &&
    !PaymentType
  ) {
    console.log("ds=a=dsa=d=sa=ds=ad=s=dsa=");
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
    return res.status(200).send(listBooking);
  }
  if (!PaymentType) {
    where = {
      OrderByDateFrom: {
        [Op.or]: [
          {
            [Op.gte]: OrderByDateFrom?.OrderByDateFrom
              ? moment(OrderByDateFrom.OrderByDateFrom).format()
              : 1,
            [Op.lte]: OrderByDateFrom?.OrderByDateTo
              ? moment(OrderByDateFrom.OrderByDateTo).format()
              : new Date(),
          },
          { [Op.eq]: null },
        ],
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
      OrderByDateFrom: {
        [Op.or]: [
          {
            [Op.gte]: OrderByDateFrom?.OrderByDateFrom
              ? moment(OrderByDateFrom.OrderByDateFrom).format()
              : 1,
            [Op.lte]: OrderByDateFrom?.OrderByDateTo
              ? moment(OrderByDateFrom.OrderByDateTo).format()
              : new Date(),
          },
          { [Op.eq]: null },
        ],
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
        as: "user",
      },
      {
        model: StudioRoom,
      },
    ],
    where,
  });
  res.status(200).send(listBooking);
});
