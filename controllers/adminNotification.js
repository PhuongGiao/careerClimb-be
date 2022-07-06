const { AdminNotification } = require("../models");
const { AppBinaryObject } = require("../models");
const { NotificationToken } = require("../models");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/pagination");
const { Op } = require("sequelize");
const { sendAndroid, sendIOS } = require("../utils/pushMessage");

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
  const Image = req.file ? req.file : null;
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
  const notificationCreation = await AdminNotification.create({
    Title,
    Content,
    Status,
    Type,
    Image: ImageNotification.Id,
    SendingTime,
    Exception,
  });
  if (notificationCreation?.dataValues.Exception.split(":")[1] === "1") {
    const NotificationTokens = await NotificationToken.findAll({
      where: {
        UserId: {
          [Op.not]:
            notificationCreation.dataValues.Exception.split(":")[0].split(","),
        },
      },
    });
    const notificationData = NotificationTokens.map((val, idx) => {
      return val.dataValues;
    });
    const android = notificationData
      .filter((val) => val.Token.length > 65)
      .map((val) => val.Token);
    const ios = notificationData
      .filter((val) => val.Token.length < 65)
      .map((val) => val.Token);
    if (new Date(notificationCreation.dataValues.SendingTime) <= new Date()) {
      if (android.length) {
        await sendAndroid(
          [
            "fFTWmQN3TICS86ih9HEWzT:APA91bFa8ZPuSeTROgmGlmjpH4GHkJRBKaCT60Ij66D2hp4X8p6Wi96XjCWnrYUhEyxxuMnVw2V9gEbq7CUp8kq6zqclPlhxsPDKxNYhk_NDCE08wQ0oyTpmnO6J2WEhFpy11QSyn7Gv",
          ],
          notificationCreation.dataValues.Title
        );
      }
      if (ios.length) {
        await sendIOS(
          ["34578769a4cf52e93ebee7d207604462f345d88f039bccb3ba10010231c43e3d"],
          notificationCreation.dataValues.Title
        );
      }
    } else {
      const time =
        new Date(notificationCreation.dataValues.SendingTime) - new Date();
      setTimeout(async () => {
        if (android.length) {
          await sendAndroid(
            [
              "fFTWmQN3TICS86ih9HEWzT:APA91bFa8ZPuSeTROgmGlmjpH4GHkJRBKaCT60Ij66D2hp4X8p6Wi96XjCWnrYUhEyxxuMnVw2V9gEbq7CUp8kq6zqclPlhxsPDKxNYhk_NDCE08wQ0oyTpmnO6J2WEhFpy11QSyn7Gv",
            ],
            notificationCreation.dataValues.Title
          );
        }
        if (ios.length) {
          await sendIOS(
            [
              "34578769a4cf52e93ebee7d207604462f345d88f039bccb3ba10010231c43e3d",
            ],
            notificationCreation.dataValues.Title
          );
        }
        notificationCreation.Status = 0;
        await notificationCreation.save();
      }, time);
    }
  }

  res.status(200).send(notificationCreation);
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
exports.filterNotification = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const { CreateDate, updateDate, keyString } = req.body;
  if (keyString || CreateDate || updateDate) {
    const data = await Pagination(RegisterPartner, page, limit, {
      where: {
        [Op.or]: {
          PartnerName: {
            [Op.like]: keyString ? `%${keyString}%` : "%",
          },
          Phone: {
            [Op.like]: `%${keyString}%`,
          },
        },
        CreationTime: {
          [Op.gte]: CreateDate?.startDate
            ? moment(CreateDate.startDate).format()
            : 1,
          [Op.lte]: CreateDate?.endDate
            ? moment(CreateDate.endDate).format()
            : new Date(),
        },
        LastModificationTime: {
          [Op.gte]: updateDate?.startDate
            ? moment(updateDate.startDate).format()
            : 1,
          [Op.lte]: updateDate?.endDate
            ? moment(updateDate.endDate).format()
            : new Date(),
        },
      },
    });
    res.status(200).json({ ...data });
  } else {
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
  }
});
