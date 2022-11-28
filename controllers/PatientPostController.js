const {
  PatientPost,
  PatientPostBinaryObject,
  Patient,
  Comment,
} = require("../models");
const catchAsync = require("../middlewares/async");

exports.getAllPatientPost = catchAsync(async (req, res) => {
  const rawList = await PatientPost.findAll({
    include: [
      {
        model: PatientPostBinaryObject,
        attributes: ["id"],
        as: "images",
      },
      {
        model: Comment,
        as: "comments",
        order: [[PatientPost.comments, "createdAt", "DESC"]],
      },
      {
        model: Patient,
        attributes: ["id", "name"],
        as: "user",
      },
    ],
    order: [
      ["createdAt", "DESC"],
      [{ model: Comment, as: "comments" }, "createdAt", "DESC"],
    ],
  });
  const list = rawList.map((val) => ({
    ...val.toJSON(),
    images: val.toJSON().images.map((img) => img.id),
  }));
  res.status(200).json({
    success: true,
    data: list,
  });
});
exports.createPatientPost = catchAsync(async (req, res) => {
  const { content, tags } = req.body;
  const patientId = req.user.id;
  const post = await PatientPost.create({
    content,
    patientId,
    tags,
  });
  if (req.files) {
    await PatientPostBinaryObject.bulkCreate(
      req.files.map((val) => ({
        bytes: val.buffer,
        postId: post.dataValues.id,
      }))
    );
  }
  res.status(200).json({
    success: true,
    data: post,
  });
});
exports.updatePatientPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    message: "update success",
  });
});
exports.deletePatientPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    message: "delete success",
  });
});
