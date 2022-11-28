const { Doctor, DoctorBinaryObject, Specialist } = require("../models");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
exports.getallDoctor = catchAsync(async (req, res) => {
  const { nameLike } = req.query;
  const userList = await Doctor.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    include: {
      model: Specialist,
    },
    where: {
      name: {
        [Op.like]: nameLike ? `%${nameLike}%` : `%%`,
      },
    },
  });
  res.status(200).json({
    success: true,
    data: userList,
  });
});
exports.getDoctorById = catchAsync(async (req, res) => {
  const user = await Doctor.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
    include: {
      model: Specialist,
    },
  });
  res.status(200).json({
    success: true,
    data: user,
  });
});
exports.register = catchAsync(async (req, res) => {
  let {
    name,
    phoneNumber,
    age,
    gender,
    username,
    password,
    yoe,
    specialist,
    shortIntro,
  } = req.body;
  //kiem tra
  const check = await Doctor.findAll({
    where: {
      username: username,
    },
  });
  if (check.length > 0)
    throw new ApiError(400, "This username is already taken");

  const user = await Doctor.create({
    name,
    phoneNumber,
    age,
    gender,
    username,
    password: md5(password),
    yoe,
    specialist,
    shortIntro,
    rating: 0,
    treated: 0,
  });
  const avatar = await DoctorBinaryObject.create(
    {
      bytes: null,
      doctorId: user.dataValues.id,
    },
    {
      where: {
        id: user.dataValues.id,
      },
    }
  );
  await Doctor.update(
    { avatar: avatar.dataValues.id },
    {
      where: {
        id: user.dataValues.id,
      },
    }
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});
exports.login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await Doctor.findOne({
    where: {
      username: username,
    },
    include: {
      model: Specialist,
    },
  });
  const token = jwt.sign(
    {
      id: user.dataValues.id,
      username: user.dataValues.Email,
      name: user.dataValues.name,
      isDoctor: true,
    },
    process.env.JWT_KEY,
    {
      expiresIn: 86164,
    }
  );
  if (!user) throw new ApiError(404, "username not found");
  const passwordCheck = md5(password) === user.toJSON().password;
  if (!passwordCheck) throw new ApiError(404, "password wrong");
  res.status(200).json({
    success: true,
    token,
    data: user,
  });
});
exports.updateDoctor = catchAsync(async (req, res) => {
  await Doctor.update(
    {
      ...req.body,
    },
    {
      where: {
        id: req.user.id,
      },
    }
  );
  if (req.file) {
    console.log("first");
    await DoctorBinaryObject.update(
      {
        bytes: req.file.buffer,
      },
      {
        where: {
          doctorId: req.user.id,
        },
      }
    );
  }

  res.status(200).json({
    success: true,
  });
});
