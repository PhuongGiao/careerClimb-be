const { Patient, Doctor } = require("../models");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
exports.getallPatient = catchAsync(async (req, res) => {
  const userList = await Patient.findAll();
  res.status(200).json({
    success: true,
    data: userList,
  });
});

exports.register = catchAsync(async (req, res) => {
  let {
    name,
    age,
    phoneNumber,
    username,
    password,
    gender,
    healthPoint,
    height,
    weight,
  } = req.body;
  const check = await Patient.findAll({
    where: {
      username: username,
    },
  });
  if (check.length > 0)
    throw new ApiError(400, "This username is already taken");

  const user = await Patient.create({
    name,
    age,
    phoneNumber,
    username,
    password: md5(password),
    gender,
    healthPoint,
    height,
    weight,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await Patient.findOne({
    where: {
      username: username,
    },
  });
  const token = jwt.sign(
    {
      id: user.dataValues.id,
      username: user.dataValues.Email,
      name: user.dataValues.name,
      isDoctor: false,
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

exports.updatePatient = catchAsync(async (req, res) => {
  await Patient.update(
    {
      ...req.body,
    },
    {
      where: {
        id: req.user.id,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.me = catchAsync(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const data = jwt.verify(token, process.env.JWT_KEY);
  let user;
  if (!data.isDoctor) {
    user = await Patient.findByPk(data.id);
  } else {
    user = await Doctor.findByPk(data.id);
  }
  res.json({
    success: true,
    data: user,
  });
});
