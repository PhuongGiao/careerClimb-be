const { Op } = require("sequelize");
const catchAsync = require("../middlewares/async");
const { StudioRating, StudioPost, BookingUser } = require("../models");
const ApiError = require("../utils/ApiError");
const { ImageListDestructure } = require("../utils/ListWithImageDestructure");
const moment = require("moment");
const { createWebHook } = require("../utils/WebHook");

exports.getALL = catchAsync(async (req, res) => {
  const { rank, rating, page, limit, keyString } = req.query;
  let list = [];
  if (keyString) {
    list = await StudioRating.findAll({
      include: [
        {
          model: StudioPost,
          where: {
            Name: {
              [Op.like]: keyString ? `%${keyString}%` : "%",
            },
          },
        },
      ],
    });
  } else {
    list = await StudioRating.findAll({
      include: [
        {
          model: StudioPost,
        },
        {
          model: BookingUser,
        },
      ],
    });
  }

  list = await Promise.all(
    list?.map(async (val) => {
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
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );

  res.status(200).json({
    success: true,
    pagination: {
      totalPages,
      limit: +limit,
      total,
      currentPage: +page,
      hasNextPage: page <= totalPages - 1,
    },
    data: ImageListDestructure(newList),
  });
});

exports.getDetailById = catchAsync(async (req, res) => {
  const detail = await StudioPost.findOne({
    where: { Id: req.params.id },
    include: [
      {
        model: StudioRating,
        as: "ratings",
        include: {
          model: BookingUser,
        },
      },
    ],
  });
  const trueData = [detail.dataValues];
  createWebHook(
    req.method,
    req.originalUrl,
    moment(Date.now()),
    JSON.stringify(req.body)
  );
  res.status(200).json(ImageListDestructure(trueData)[0]);
});

exports.getRatingByPostId = catchAsync(async (req, res) => {
  if (req.query.rate) {
    let rate = await StudioPost.findOne({
      where: { Id: req.params.id },
      attributes: [],
      include: [
        {
          model: StudioRating,
          as: "ratings",
          where: {
            Rate: req.query.rate,
          },
          include: {
            model: BookingUser,
          },
        },
      ],
    });
    if (rate?.ratings == null) throw new ApiError(404, "NOT FOUND!!");
    const trueData = rate?.ratings.map((val) => val.dataValues);
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res
      .status(200)
      .json({ success: true, data: ImageListDestructure(trueData) });
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
        include: {
          model: BookingUser,
        },
      },
    });
    if (rate?.ratings == null) throw new ApiError(404, "NOT FOUND!!");
    const trueData = rate?.ratings.map((val) => val.dataValues);
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res
      .status(200)
      .json({ success: true, data: ImageListDestructure(trueData) });
  } else if (Boolean(req.query.image)) {
    let rate = await StudioPost.findOne({
      where: { Id: req.params.id },
      attributes: [],
      include: {
        model: StudioRating,
        as: "ratings",
        include: {
          model: BookingUser,
        },
      },
    });
    let list = [];
    rate?.ratings.map((item, idx) => {
      const image = `Image${idx + 1}`;
      const video = `Video${idx + 1}`;
      {
        item[image] || item[video] ? (list = [...list, item]) : "";
      }
    });
    if (rate?.ratings == null) throw new ApiError(404, "NOT FOUND!!");
    const trueData = list.map((val) => val.dataValues);
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res
      .status(200)
      .json({ success: true, data: ImageListDestructure(trueData) });
  } else {
    let rate = await StudioPost.findOne({
      where: { Id: req.params.id },
      attributes: [],
      include: {
        model: StudioRating,
        as: "ratings",
        include: {
          model: BookingUser,
        },
      },
    });
    const trueData = rate.ratings.map((val) => val.dataValues);
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res
      .status(200)
      .json({ success: true, data: ImageListDestructure(trueData) });
  }
});
