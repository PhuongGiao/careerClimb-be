const { Op } = require("sequelize");
const catchAsync = require("../middlewares/async");
const { StudioRating, sequelize, StudioPost } = require("../models");
const ApiError = require("../utils/ApiError");

exports.getALL = catchAsync(async (req, res) => {
  const { rank, rating, page, limit } = req.query;
  let list = undefined;
  list = await StudioRating.findAll({
    include: {
      model: StudioPost,
    },
  });
  list = await Promise.all(
    list.map(async (val) => {
      const count = await StudioRating.count({
        where: { StudioPostId: val.StudioPostId },
      });
      return { ...val.dataValues, numberRate: count };
    })
  );

  Boolean(+rank)
    ? (list = list.sort((a, b) => {
        if (a.numberRate > b.numberRate) {
          return 1;
        }
        return -1;
      }))
    : (list = list.sort((a, b) => {
        if (a.numberRate < b.numberRate) {
          return 1;
        }
        return -1;
      }));

  Boolean(+rating)
    ? (list = list.sort((a, b) => {
        if (a.Rate > b.Rate) {
          return 1;
        }
        return -1;
      }))
    : (list = list.sort((a, b) => {
        if (a.Rate < b.Rate) {
          return 1;
        }
        return -1;
      }));

  //pagination
  const total = list.length;
  if (+limit <= 0 || isNaN(+limit) || +limit >= 20) {
    limit = 1;
  }
  if (+page <= 0 || isNaN(+page)) {
    page = 1;
  }
  let totalPages = Math.ceil(total / limit);
  let skip = (+page - 1) * +limit;
  if (totalPages < +page) {
    page = 1;
  }

  const newList = list.slice(skip, limit);

  res.status(200).json({
    success: true,
    pagination: {
      totalPages,
      limit: +limit,
      total,
      currentPage: +page,
      hasNextPage: page <= totalPages - 1,
    },
    data: newList,
  });
});

exports.getDetailById = catchAsync(async (req, res) => {
  const detail = await StudioPost.findOne({
    where: { Id: req.params.id },
    include: { model: StudioRating, as: "ratings" },
  });
  res.status(200).send(detail);
});

exports.getRatingByPostId = catchAsync(async (req, res) => {
  if (req.query.rate) {
    let rate = await StudioPost.findOne({
      where: { Id: req.params.id },
      attributes: [],
      include: {
        model: StudioRating,
        as: "ratings",
        where: {
          Rate: req.query.rate,
        },
      },
    });
    if (rate?.ratings == null) throw new ApiError(404, "NOT FOUND!!");
    res.status(200).send(rate?.ratings);
  } else if (Boolean(req.query.des)) {
    let rate = await StudioPost.findOne({
      where: { Id: req.params.id },
      attributes: [],
      include: {
        model: StudioRating,
        as: "ratings",
        where: {
          Description: {
            [Op.regexp]: "[a-zA-Z0-9]",
          },
        },
      },
    });
    if (rate?.ratings == null) throw new ApiError(404, "NOT FOUND!!");
    res.status(200).send(rate?.ratings);
  } else if (Boolean(req.query.des)) {
    let rate = await StudioPost.findOne({
      where: { Id: req.params.id },
      attributes: [],
      include: {
        model: StudioRating,
        as: "ratings",
      },
    });
    let list = [];
    rate?.ratings.map((item, idx) => {
      const image = `Image${idx + 1}`;
      const video = `Video${idx + 1}`;
      console.log(item[image]);
      {
        item[image] || item[video] ? (list = [...list, item]) : "";
      }
    });
    if (rate?.ratings == null) throw new ApiError(404, "NOT FOUND!!");
    res.status(200).send(list);
  } else {
    let rate = await StudioPost.findOne({
      where: { Id: req.params.id },
      attributes: [],
      include: {
        model: StudioRating,
        as: "ratings",
      },
    });
    res.status(200).send(rate.ratings);
  }
});
