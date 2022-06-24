const { RegisterPartner } = require("../models");
const { BookingUser } = require("../models");

const { Op } = require("sequelize");
const catchAsync = require("../middlewares/async");
const moment = require("moment");
const { downloadExcelTest } = require("./ excel.controller");

exports.filterOption = catchAsync(async (req, res) => {
  const { option } = req.query;
  const { IsDeleted, ProvinceId, createDate } = req.body;
  switch (option) {
    case "1":
      //Tai khoan doi tac
      const data1 = await RegisterPartner.findAll({
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
      downloadExcelTest(data1, res);
    case "2":
      //Tai khoan khach hang
      const data2 = await BookingUser.findAll({
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
      downloadExcelTest(data2, res);
    default:
      break;
  }
});
