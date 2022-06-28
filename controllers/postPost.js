const { AppBinaryObject } = require("../models");
const { Post } = require("../models");

const catchAsync = require("../middlewares/async");
const Pagination = require("../utils/pagination");
const ApiError = require("../utils/ApiError");

exports.postPost = catchAsync(async (req, res) => {
  const { Tags, Description } = req.body;
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
    BookingUserId: 1,
    Tags,
    CreationTime: new Date(),
    Description,
    ...Image,
  });
  res.status(200).json(data);
});

exports.getAllPost = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const list = await Pagination(Post, page, limit);
  res.status(200).send(list);
});

exports.getPostById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  res.status(200).json(post);
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
