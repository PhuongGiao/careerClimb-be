const { StudioPost, sequelize } = require("../models");
const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");
const { Op } = require("sequelize");
const moment = require("moment");
const { createWebHook } = require("../utils/WebHook");

exports.getAllStudioPost = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const data = await Pagination(StudioPost, page, limit, {});
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).json({ ...data });
});
exports.filterStudioPost = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const { keyString, CreateDate, updateDate } = req.body;

  if (
    (!CreateDate?.endDate || !CreateDate?.startDate) &&
    (updateDate?.endDate || updateDate?.startDate)
  ) {
    const data = await Pagination(StudioPost, page, limit, {
      where: {
        Name: {
          [Op.like]: keyString ? `%${keyString}%` : "%",
        },
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
    return res.status(200).json({ ...data });
  } else if (
    keyString ||
    CreateDate?.startDate ||
    CreateDate?.endDate ||
    updateDate?.startDate ||
    updateDate?.endDate
  ) {
    const data = await Pagination(StudioPost, page, limit, {
      where: {
        Name: {
          [Op.like]: keyString ? `%${keyString}%` : "%",
        },
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
            { [Op.eq]: null },
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
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(200).json({ ...data });
  } else {
    const data = await Pagination(StudioPost, page, limit, {});
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(200).json({ ...data });
  }
});

exports.getDetailStudioPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const detail = await StudioPost.findByPk(id, {});
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).send(detail);
});

exports.updateStudioPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { IsDeleted, DeleterUserId } = req.body;
    await StudioPost.update(
      { IsDeleted, DeleterUserId },
      {
        where: {
          id,
        },
      }
    );
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(200).send(`ID :${id} updated success!`);
  } catch (error) {
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(500).send(error);
  }
};

exports.deleteStation = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Station.destroy({
    where: {
      id,
    },
  });
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).send("Delete Success!");
});
