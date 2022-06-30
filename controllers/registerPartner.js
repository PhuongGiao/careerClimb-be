const { RegisterPartner, StudioPost } = require("../models");

const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");
const moment = require("moment");

exports.getAllRegisterPartner = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const partner = await Pagination(RegisterPartner, page, limit);
  const data = {
    ...partner,
    data: await Promise.all(
      partner.data.map(async (val) => {
        const count = await StudioPost.count({
          where: { CreatorUserId: val.id },
        });
        return {
          id: val.id,
          IdentifierCode: val.Phone ? `P${val.Phone}` : `P0000000000`,
          Phone: val.Phone,
          Email: val.Email,
          NumberOfPost: count,
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

exports.getPartnerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const partner = await RegisterPartner.findByPk(id);
  if (!partner) {
    throw new ApiError(404, "Partner not found!");
  }
  const count = await StudioPost.count({
    where: { CreatorUserId: id },
  });
  const data = {
    id: partner.id,
    IdentifierCode: `P${partner.Phone}`,
    Phone: partner.Phone,
    Email: partner.Email,
    NumberOfPost: count,
    CreationTime: partner.CreationTime,
    LastModificationTime: partner.LastModificationTime,
    IsDeleted: partner.IsDeleted,
    PartnerName: partner.PartnerName,
    OtherPhone: partner.OtherPhone,
    BusinessRegistrationLicenseNumber:
      partner.BusinessRegistrationLicenseNumber,
    Address: partner.Address,
    BankBranchName: partner.BankBranchName,
    BankAccount: partner.BankAccount,
    BankAccountOwnerName: partner.BankAccountOwnerName,
  };
  res.status(200).json(data);
});

exports.updatePartnerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {
    IsDeleted,
    PartnerName,
    RepresentativeName,
    Phone,
    OtherPhone,
    Email,
    ReEmail,
    BusinessRegistrationLicenseNumber,
    Address,
    BankBranchName,
    BankAccount,
    BankAccountOwnerName,
    LastModificationTime,
  } = req.body;
  await RegisterPartner.update(
    {
      IsDeleted,
      PartnerName,
      RepresentativeName,
      Phone,
      OtherPhone,
      Email,
      ReEmail,
      BusinessRegistrationLicenseNumber,
      Address,
      BankBranchName,
      BankAccount,
      BankAccountOwnerName,
      LastModificationTime,
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

exports.filterPartner = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const { createDate, updateDate, IsDeleted, keyString } = req.body;
  const list = await Pagination(RegisterPartner, page, limit, {
    where: {
      [Op.or]: {
        Email: {
          [Op.like]: `%${keyString}%`,
        },
        Phone: {
          [Op.like]: `%${keyString}%`,
        },
      },

      CreationTime: {
        [Op.gte]: createDate?.startDate
          ? moment(createDate.startDate).format()
          : 1,
        [Op.lte]: createDate?.endDate
          ? moment(createDate.endDate).format()
          : new Date(),
      },
      // LastModificationTime: {
      //   [Op.gte]: updateDate?.startDate
      //     ? moment(updateDate.startDate).format()
      //     : 1,
      //   [Op.lte]: updateDate?.endDate
      //     ? moment(updateDate.endDate).format()
      //     : new Date(),
      // },
    },
  });
  res.status(200).send(list);
});
