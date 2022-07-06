const { StudioPost, sequelize } = require("../models");
const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");
const { Op } = require("sequelize");
const moment = require("moment");

exports.getAllStudioPost = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const data = await Pagination(StudioPost, page, limit, {});
  res.status(200).json({ ...data });
});
exports.filterStudioPost = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const { Name, CreateDate, updateDate } = req.body;
  console.log(req.body);

  if (
    Name ||
    CreateDate?.startDate ||
    CreateDate?.endDate ||
    updateDate?.startDate ||
    updateDate?.endDate
  ) {
    const data = await Pagination(StudioPost, page, limit, {
      where: {
        Name: {
          [Op.like]: Name ? `%${Name}%` : "%",
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
            { [Op.eq]: null },
          ],
        },
      },
    });
    res.status(200).json({ ...data });
  } else {
    const data = await Pagination(StudioPost, page, limit, {});
    res.status(200).json({ ...data });
  }
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
