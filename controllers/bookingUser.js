const { BookingUser } = require("../models");
const catchAsync = require("../middlewares/async");
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
  const listStation = await BookingUser.findAll();
  res.status(200).send(listStation);
});

exports.updateBookingUser = catchAsync(async (req, res) => {
  const {id }=req.params
    const {
      Email,
      Username,
      Phone,
      Fullname,
      CreatedDate,
      UpdatedDate,
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
        CreatedDate,
        UpdatedDate,
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
    res.status(200).send(`Id=${id} update success!`);
});
