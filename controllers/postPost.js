const { AppBinaryObject, sequelize } = require("../models");
const { Post } = require("../models");

const catchAsync = require("../middlewares/async");
const { Op } = require("sequelize");
const ApiError = require("../utils/ApiError");
const constant = [
  "studio",
  "makeup",
  "nguoimau",
  "nhiepanh",
  "thietbi",
  "trangphuc",
];

exports.postPost = catchAsync(async (req, res) => {
  let { Tags, Description } = req.body;
  rawOptions = Tags.split(",");

  newOptions = rawOptions
    .filter((option) => constant.indexOf(option) !== -1) //filter by constant
    .filter((option, idx) => rawOptions.indexOf(option) === idx) //make unique
    .sort()
    .join(",");
  console.log(newOptions);

  if (!Tags) {
    throw new ApiError(500, "Please check the tag again");
  }
  let listImage = [];
  await Promise.all(
    req.files.map(async (val) => {
      let data = await AppBinaryObject.create({
        Bytes: val.buffer,
        Description: val.originalname,
      });
      listImage = [...listImage, data.dataValues.Id];
    })
  );
  const Image = listImage.reduce((acc, val, idx) => {
    const name = `Image${idx + 1}`;
    return { ...acc, [name]: val };
  }, {});
  const data = await Post.create({
    BookingUserId: 5,
    Tags,
    CreationTime: new Date(),
    Description,
    ...Image,
  });
  res.status(200).json(data);
});

exports.getAllPost = catchAsync(async (req, res) => {
  let { page, limit, tags } = req.query;
  console.log(tags);
  let where;
  let rightOption;
  if (tags !== undefined) {
    const rawOptions = tags.split(",");
    rightOption = rawOptions
      .filter((option) => constant.indexOf(option) !== -1) //filter by constant
      .filter((option, idx) => rawOptions.indexOf(option) === idx) //make unique
      .sort()
      .join(",");
  } else {
    rightOption = "";
  }
  where = {
    Tags: {
      [Op.like]: `%${rightOption}%`,
    },
  };
  let total = await Post.count({ where });
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
  const newList = await sequelize.query(
    "SELECT Posts.Id as Id,Posts.Tags,Posts.Description,Posts.Image1,Posts.Image2,Posts.Image3,Posts.Image4,Posts.Image5,Posts.Image6,Posts.TotalLikes,Posts.TotalComments,Posts.CreationTime,BookingUsers.Username,BookingUsers.Image as Avatar FROM Posts INNER JOIN BookingUsers ON  BookingUsers.Id = Posts.BookingUserId WHERE Posts.Tags LIKE :string ORDER BY Posts.Id DESC LIMIT :limit OFFSET :offset",
    {
      replacements: {
        string: "%" + rightOption + "%",
        offset: +skip,
        limit: +limit,
      },
      type: "SELECT",
    }
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
    data: newList,
  });
});

exports.getPostById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const newList = await sequelize.query(
    "SELECT Posts.Id as Id,Posts.Tags,Posts.Description,Posts.Image1,Posts.Image2,Posts.Image3,Posts.Image4,Posts.Image5,Posts.Image6,Posts.TotalLikes,Posts.TotalComments,Posts.CreationTime,BookingUsers.Username,BookingUsers.Image as Avatar FROM Posts INNER JOIN BookingUsers ON  BookingUsers.Id = Posts.BookingUserId WHERE Posts.Id = :id",
    {
      replacements: {
        id,
      },
      type: "SELECT",
    }
  );
  if (!newList[0]) {
    throw new ApiError(404, "Post not found");
  }
  res.status(200).json(newList[0]);
});

exports.deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  const { Image1, Image2, Image3, Image4, Image5, Image6 } = post;
  const ImageList = [Image1, Image2, Image3, Image4, Image5, Image6];

  await Promise.all(
    ImageList.map(async (val) => {
      if (val !== null) {
        await AppBinaryObject.destroy({ where: { id: val } });
      }
    })
  );
  await Post.destroy({ where: { id } });
  res.status(200).json({
    success: true,
    message: "Delete success",
  });
});
