const { RegisterPartner } = require("../models");
const { BookingUser } = require("../models");
const { createWebHook } = require("../utils/WebHook");

const { Op } = require("sequelize");
const catchAsync = require("../middlewares/async");
const moment = require("moment");
const { downloadExcel } = require("../utils/excel");

exports.filterOption = catchAsync(async (req, res) => {
  let { option, IsDeleted, ProvinceId, createDate } = req.query;
  if (createDate) {
    createDate = JSON.parse(createDate);
  }
  if (IsDeleted) {
    IsDeleted = IsDeleted == "true";
  }
  if (ProvinceId) {
    ProvinceId = +ProvinceId;
  }
  let data;
  switch (option) {
    case "1":
      //Tai khoan doi tac
      data = await RegisterPartner.findAll({
        where: {
          ProvinceId: ProvinceId ? ProvinceId : !null,
          IsDeleted:
            IsDeleted !== undefined
              ? IsDeleted
              : {
                  [Op.or]: [true, false],
                },
          CreationTime: {
            [Op.gte]: createDate?.startDate
              ? moment(createDate.startDate).format()
              : 1,
            [Op.lte]: createDate?.endDate
              ? moment(createDate.endDate).format()
              : new Date(),
          },
        },
      });
      return downloadExcel(data, res);
    case "2":
      //Tai khoan khach hang
      data = await BookingUser.findAll({
        where: {
          ProvinceId:
            ProvinceId !== undefined
              ? ProvinceId
              : {
                  [Op.between]: [1, 100],
                },
          IsDeleted:
            IsDeleted !== undefined
              ? IsDeleted
              : {
                  [Op.or]: [true, false],
                },
          CreationTime: {
            [Op.gte]: createDate?.startDate
              ? moment(createDate.startDate).format()
              : 1,
            [Op.lte]: createDate?.endDate
              ? moment(createDate.endDate).format()
              : new Date(),
          },
        },
      });
      return downloadExcel(data, res);
    default:
      break;
  }
});
