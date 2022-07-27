const identity = require("aspnetcore-identity-password-hasher");
const { AbpUser } = require("../models");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { createWebHook } = require("../utils/WebHook");

exports.login = async (req, res) => {
  try {
    const user = await AbpUser.findOne({
      where: {
        EmailAddress: req.body.email,
      },
    });
    if (!user) {
      throw new ApiError(404, "NOT FOUND !!");
    }
    const isPasswordCorrect = await identity.verify(
      req.body.password,
      user.dataValues.Password
    );

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Wrong password or username");
    }
    const token = jwt.sign(
      { id: user.id, Name: user.Name },
      process.env.SECRET,
      { expiresIn: 86164 }
    );

    const {
      Password,
      SecurityStamp,
      SignInToken,
      SignInTokenExpireTimeUtc,
      GoogleAuthenticatorKey,
      ConcurrencyStamp,
      ...otherDetails
    } = user.dataValues;
    createWebHook(
      req.method,
      req.originalUrl,
      moment(Date.now()),
      JSON.stringify(req.body)
    );
    res.status(200).send({ ...otherDetails, token });
  } catch (error) {
    throw new ApiError(400, error);
  }
};
