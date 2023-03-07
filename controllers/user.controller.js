const catchAsync = require("../middlewares/async");
const jwt = require("jsonwebtoken");
const { User, PatientDetail } = require("../models");
const { Op } = require("sequelize");
const ApiError = require("../utils/ApiError");

exports.userWithGoogle = catchAsync(async (req, res) => {
  const { email, firstName, lastName, fullName, photoUrl } =
    req.body._tokenResponse;
  let user;
  const isRegistered = await User.findOne({
    where: {
      googleEmail: email,
      isDelete: false,
    },
    include: [
      {
        model: PatientDetail,
        as: "details",
      },
    ],
  });

  if (!isRegistered) {
    user = await User.create({
      email,
      firstName,
      lastName,
      fullName,
      googlePicture: photoUrl,
      googleEmail: email,
      googleName: fullName,
      isActivateEmail: true,
      isActivate: false,
      image: photoUrl,
      isDelete: false,
      isPatient: true,
    });
  } else {
    user = isRegistered;
  }
  const token = jwt.sign(
    {
      id: user.dataValues.id,
    },
    process.env.SECRET,
    {
      expiresIn: 86164,
    }
  );
  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});
exports.userWithFacebook = catchAsync(async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    fullName,
    photoUrl,
    idToken,
    federatedId,
  } = req.body._tokenResponse;
  let user;
  const isRegistered = await User.findOne({
    where: {
      facebookId: federatedId.split("http://facebook.com/")[1],
      isDelete: false,
    },
    include: [
      {
        model: PatientDetail,
        as: "details",
      },
    ],
  });
  if (!isRegistered) {
    user = await User.create({
      email,
      firstName,
      lastName,
      fullName,
      facebookPicture: photoUrl,
      facebookEmail: email,
      facebookFirstname: firstName,
      facebookLastname: lastName,
      facebookToken: idToken,
      facebookId: federatedId.split("http://facebook.com/")[1],
      isActivate: false,
      image: photoUrl,
      isDelete: false,
      isPersonal: true,
    });
  } else {
    user = isRegistered;
  }
  const token = jwt.sign(
    {
      id: user.dataValues.id,
    },
    process.env.SECRET,
    {
      expiresIn: 86164,
    }
  );
  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});
exports.me = catchAsync(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const data = jwt.verify(token, process.env.SECRET);
  const user = await User.findByPk(data.id, {
    include: [
      {
        model: PatientDetail,
        as: "details",
      },
    ],
  });
  if (user === null) {
    throw new ApiError(404, "Failed");
  }
  res.json({
    success: true,
    user: user,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  let userId = req.user.id;
  if (req.body?.email) {
    const check = await User.findOne({
      where: {
        email: req.body?.email,
        id: {
          [Op.not]: userId,
        },
      },
    });
    if (check) throw new ApiError(500, "Email is already in used");
  }
  if (req.body?.phone) {
    const check = await User.findOne({
      where: {
        phone: req.body?.phone,
        id: {
          [Op.not]: userId,
        },
      },
    });
    if (check) throw new ApiError(500, "Phone number is already in used");
  }
  await User.update(req.body, {
    where: {
      id: userId,
    },
  });
  res.status(200).json({
    success: true,
  });
});
