const { StudioPost } = require("../models");
const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");
const { Op } = require("sequelize");
const moment = require("moment");

exports.getAllStudioPost = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const { Name, createDate, updateDate } = req.body;
  const data = await Pagination(StudioPost, page, limit, {
    where: {
      Name: {
        [Op.like]: `%${Name}%`,
      },
      CreationTime: {
        [Op.gte]: createDate?.startDate
          ? moment(createDate.startDate).format()
          : 1,
        [Op.lte]: createDate?.endDate
          ? moment(createDate.endDate).format()
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
});

exports.getDetailStudioPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const detail = await StudioPost.findByPk(id, {});
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
    res.status(200).send(`ID :${id} updated success!`);
  } catch (error) {
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
  res.status(200).send("Delete Success!");
});
