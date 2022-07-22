const { BookingUser } = require("../models");
const { StudioBooking } = require("../models");
const moment = require("moment");
const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");
const { Op } = require("sequelize");
exports.createBookingUser = catchAsync(async (req, res) => {
  const {
    TenantId,
    Email,
    Username,
    Phone,
    HashPassword,
    Salt,
    Fullname,
    CreatedDate,
    UpdatedDate,
    Status,
    UpdatedBy,
    Image,
    FacebookId,
    GoogleEmail,
    FacebookToken,
    FacebookFirstname,
    FacebookLastname,
    FacebookEmail,
    FacebookPicture,
    GoogleName,
    GooglePicture,
    UserTypeId,
    CreationTime,
    CreatorUserId,
    LastModificationTime,
    LastModifierUserId,
    IsDeleted,
    DeleterUserId,
    DeletionTime,
    AppleEmail,
    AppleFamilyName,
    AppleGivenName,
    AppleUserIdentifier,
  } = req.body;
  const newStation = await BookingUser.create({
    TenantId,
    Email,
    Username,
    Phone,
    HashPassword,
    Salt,
    Fullname,
    CreatedDate,
    UpdatedDate,
    Status,
    UpdatedBy,
    Image,
    FacebookId,
    GoogleEmail,
    FacebookToken,
    FacebookFirstname,
    FacebookLastname,
    FacebookEmail,
    FacebookPicture,
    GoogleName,
    GooglePicture,
    UserTypeId,
    CreationTime,
    CreatorUserId,
    LastModificationTime,
    LastModifierUserId,
    IsDeleted,
    DeleterUserId,
    DeletionTime,
    AppleEmail,
    AppleFamilyName,
    AppleGivenName,
    AppleUserIdentifier,
  });
  res.status(201).send(newStation);
});

exports.getAllBookingUser = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const bookingUser = await Pagination(BookingUser, page, limit);

  const data = {
    ...bookingUser,
    data: await Promise.all(
      bookingUser.data.map(async (val) => {
        const count = await StudioBooking.count({
          where: { BookingUserId: val.id },
        });
        return {
          id: val.id,
          IdentifierCode: val.Phone ? `P${val.Phone}` : `P0000000000`,
          Phone: val.Phone,
          Email: val.Email,
          NumberOfBooking: count,
          CreationTime: val.CreationTime,
          LastModificationTime: val.LastModificationTime,
          IsDeleted: val.IsDeleted,
        };
      })
    ),
  };
  res.status(200).json({
    ...data,
  });
});

exports.updateBookingUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {
    Email,
    Username,
    Phone,
    Fullname,
    Status,
    Image,
    GoogleEmail,
    FacebookEmail,
    GoogleName,
  } = req.body;
  await BookingUser.update(
    {
      Email,
      Username,
      Phone,
      Fullname,
      Status,
      Image,
      GoogleEmail,
      FacebookEmail,
      GoogleName,
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

exports.getBookingUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await BookingUser.findByPk(id);
  if (!user) {
    throw new ApiError(404, "Partner not found!");
  }
  const count = await StudioBooking.count({
    where: { BookingUserId: id },
  });
  const data = {
    id: user.id,
    IdentifierCode: `C${user.Phone}`,
    Phone: user.Phone,
    Email: user.Email,
    NumberOfOrder: count,
    CreationTime: user.CreationTime,
    LastModificationTime: user.LastModificationTime,
    IsDeleted: user.IsDeleted,
    GoogleEmail: user.GoogleEmail,
    FacebookEmail: user.FacebookEmail,
    GoogleName: user.GoogleName,
  };
  res.status(200).json(data);
});

exports.filterBookingUser = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const { CreateDate, updateDate, keyString, status } = req.body;
  let statusNoti = status.toString() == "0" ? true : status;
  if (
    (!CreateDate?.endDate || !CreateDate?.startDate) &&
    (updateDate?.endDate || updateDate?.startDate)
  ) {
    const bookingUser = await Pagination(BookingUser, page, limit, {
      where: {
        [Op.or]: {
          Email: {
            [Op.like]: keyString ? `%${keyString}%` : "%",
          },
          Phone: {
            [Op.like]: `%${keyString}%`,
          },
        },
        Status: statusNoti ? { [Op.in]: [Status] } : { [Op.notIn]: "" },

        CreationTime: {
          [Op.or]: [
            {
              [Op.gte]: CreateDate?.startDate
                ? moment(CreateDate.startDate).format()
                : 1,
              [Op.lte]: CreateDate?.endDate
                ? moment(CreateDate.endDate).format()
                : new Date(),
            },
          ],
        },
        LastModificationTime: {
          [Op.or]: [
            {
              [Op.gte]: updateDate?.startDate
                ? moment(updateDate.startDate).format()
                : 1,
              [Op.lte]: updateDate?.endDate
                ? moment(updateDate.endDate).format()
                : new Date(),
            },
          ],
        },
      },
    });
    const data = {
      ...bookingUser,
      data: await Promise.all(
        bookingUser.data.map(async (val) => {
          const count = await StudioBooking.count({
            where: { BookingUserId: val.id },
          });
          return {
            id: val.id,
            IdentifierCode: val.Phone ? `P${val.Phone}` : `P0000000000`,
            Phone: val.Phone,
            Email: val.Email,
            NumberOfBooking: count,
            CreationTime: val.CreationTime,
            LastModificationTime: val.LastModificationTime,
            IsDeleted: val.IsDeleted,
          };
        })
      ),
    };
    return res.status(200).json({
      ...data,
    });
  } else if (
    keyString ||
    CreateDate?.startDate ||
    CreateDate?.endDate ||
    updateDate?.startDate ||
    updateDate?.endDate ||
    statusNoti
  ) {
    const bookingUser = await Pagination(BookingUser, page, limit, {
      where: {
        [Op.or]: {
          Email: {
            [Op.like]: keyString ? `%${keyString}%` : "%",
          },
          Phone: {
            [Op.like]: `%${keyString}%`,
          },
        },
        Status: statusNoti ? { [Op.in]: [status] } : { [Op.notIn]: "" },
        CreationTime: {
          [Op.or]: [
            {
              [Op.gte]: CreateDate?.startDate
                ? moment(CreateDate.startDate).format()
                : 1,
              [Op.lte]: CreateDate?.endDate
                ? moment(CreateDate.endDate).format()
                : new Date(),
            },
          ],
        },
        LastModificationTime: {
          [Op.or]: [
            {
              [Op.gte]: updateDate?.startDate
                ? moment(updateDate.startDate).format()
                : 1,
              [Op.lte]: updateDate?.endDate
                ? moment(updateDate.endDate).format()
                : new Date(),
            },
            { [Op.eq]: null },
          ],
        },
      },
    });
    const data = {
      ...bookingUser,
      data: await Promise.all(
        bookingUser.data.map(async (val) => {
          const count = await StudioBooking.count({
            where: { BookingUserId: val.id },
          });
          return {
            id: val.id,
            IdentifierCode: val.Phone ? `P${val.Phone}` : `P0000000000`,
            Phone: val.Phone,
            Email: val.Email,
            NumberOfBooking: count,
            CreationTime: val.CreationTime,
            LastModificationTime: val.LastModificationTime,
            IsDeleted: val.IsDeleted,
          };
        })
      ),
    };
    res.status(200).json({
      ...data,
    });
  } else {
    const bookingUser = await Pagination(BookingUser, page, limit);

    const data = {
      ...bookingUser,
      data: await Promise.all(
        bookingUser.data.map(async (val) => {
          const count = await StudioBooking.count({
            where: { BookingUserId: val.id },
          });
          return {
            id: val.id,
            IdentifierCode: val.Phone ? `P${val.Phone}` : `P0000000000`,
            Phone: val.Phone,
            Email: val.Email,
            NumberOfBooking: count,
            CreationTime: val.CreationTime,
            LastModificationTime: val.LastModificationTime,
            IsDeleted: val.IsDeleted,
          };
        })
      ),
    };
    res.status(200).json({
      ...data,
    });
  }
  // else {
  //   const data = await Pagination(StudioPost, page, limit, {});
  //   res.status(200).json({ ...data });
  // }
});
