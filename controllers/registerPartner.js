const { RegisterPartner } = require("../models");
const { StudioPost } = require("../models");

const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");
const ApiError = require("../utils/ApiError");

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
          IdentifierCode: `P${val.Phone}`,
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
  res.status(200).json({
    ...data,
  });
});

exports.updatePartnerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {
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
  } = req.body;
  const data = await RegisterPartner.update(
    {
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
    },
    {
      where: {
        id,
      },
    }
  );
  console.log(data);
  res.status(200).json({
    success: true,
    message: "Update success",
  });
});
