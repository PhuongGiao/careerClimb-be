const { AdminNotification } = require("../models");
const { AppBinaryObject } = require("../models");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/pagination");
const { Op } = require("sequelize");

exports.getAllNotification = catchAsync(async (req, res) => {
  const { page, limit, option } = req.query;
  let data;
  if (option === null || +option === 1 || +option === 0) {
    data = await Pagination(AdminNotification, page, limit, {
      where: {
        Exception: {
          [Op.like]: `%:${option}%`,
        },
      },
    });
  } else {
    data = await Pagination(AdminNotification, page, limit);
  }
  res.status(200).json(data);
});

exports.createNotification = catchAsync(async (req, res) => {
  const { Title, Content, Type, SendingTime, Exception } = req.body;
  const Image = req.file;
  let Status = 0;
  const checking = Exception.split(":");
  if (
    checking.length > 2 ||
    !checking[0] ||
    !checking[1] ||
    Number(checking[1]) > 1 ||
    Number(checking[1]) < 0
  ) {
    throw new ApiError(500, "Wrong notification exception format");
  }
  if (Type > 3 || Type < 0) {
    throw new ApiError(500, "Wrong type format (0,1,2,3)");
  }
  if (!SendingTime) {
    Status = 0;
  }
  if (new Date(SendingTime) > new Date()) {
    Status = 1;
  } else {
    Status = 0;
  }

  const ImageNotification = await AppBinaryObject.create({
    Bytes: Image.buffer,
    Description: "notification" + Image.originalname,
  });
  const notification = await AdminNotification.create({
    Title,
    Content,
    Status,
    Type,
    Image: ImageNotification.Id,
    SendingTime,
    Exception,
  });
  res.status(200).send(notification);
});

exports.cancelNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminNotification.update(
    { Status: 2 },
    {
      where: {
        id,
      },
    }
  );
  res.status(200).json({
    success: true,
    message: "Cancel success",
  });
});
exports.getNotificationById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await AdminNotification.findByPk(id);
  res.status(200).json({
    success: true,
    message: data,
  });
});