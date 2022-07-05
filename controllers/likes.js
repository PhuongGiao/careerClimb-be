const { Love } = require("../models");
const { Post } = require("../models");

const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");

exports.createLove = catchAsync(async (req, res) => {
  const { PostId, UserId, PostType } = req.body;
  console.log(req.body);
  const exits = await Love.findOne({
    where: {
      PostId,
      UserId,
    }
  });
  
  if (exits){
      console.log(exits)
    await Love.destroy({
        where:{
            id:exits.id
        }

    })
    return res.status(200).send("unlike");
  }
  if (!PostId) {
    throw new ApiError(500, "PostId is required");
  }
  const love = await Love.create({
    UserId,
    PostId,
    PostType,
  });
  const countLove = await Love.count({ where: { PostId: PostId } });
  console.log(countLove);
  await Post.update({ TotalLikes: countLove }, { where: { id: PostId } });
  res.status(200).send(love);
});

exports.getLovesByPostId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const Loves = await Love.findAll({
    where: {
      PostId: id,
    },
  });
  res.status(200).json({
    success: true,
    data: Loves,
  });
});
