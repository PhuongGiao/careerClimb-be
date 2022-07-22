const { CssFile, Page } = require("../models");

const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");

exports.getAllCssFile = catchAsync(async (req, res) => {
  const list = await CssFile.findAll({});

  res.status(200).json({
    success: true,
    data: [
      ...list.map((val) => {
        return {
          ...val.dataValues,
          CssFile: process.env.BASE_URL + "api/css/" + val.dataValues.Id,
          DownloadCssFile:
            process.env.BASE_URL + "api/download/css" + val.dataValues.Id,
        };
      }),
    ],
  });
});

exports.getCssFileById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const list = await CssFile.findByPk(id);
  if (!list) {
    throw new ApiError(404, "CssFile not found");
  }
  res.status(200).json({
    success: true,
    data: {
      ...list.dataValues,
      CssFile: process.env.BASE_URL + "api/css/" + list.dataValues.Id,
      DownloadCssFile:
        process.env.BASE_URL + "api/download/css/" + list.dataValues.Id,
    },
  });
});

exports.createCssFile = catchAsync(async (req, res) => {
  const { Description } = req.body;
  const list = await CssFile.create({
    Description,
    Name: req.file.originalname,
    CssFile: req.file.buffer,
  });
  res.status(200).json({
    success: true,
    data: {
      ...list.dataValues,
      CssFile: process.env.BASE_URL + "api/css/" + list.dataValues.Id,
    },
  });
});

exports.updateCssFile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Description } = req.body;
  const list = await CssFile.findByPk(id);
  if (!list) {
    throw new ApiError(404, "CssFile not found");
  }
  if (req.file) {
    await CssFile.update(
      {
        Description,
        Name: req.file.originalname,
        CssFile: req.file.buffer,
      },
      {
        where: {
          id,
        },
      }
    );
  } else {
    await CssFile.update(
      { Description },
      {
        where: {
          id,
        },
      }
    );
  }
  res.status(200).json({
    success: true,
    message: "update success",
  });
});
exports.deleteCssFile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const list = await CssFile.findByPk(id);
  if (!list) {
    throw new ApiError(404, "CssFile not found");
  }
  await CssFile.destroy({
    where: {
      id,
    },
  });
  res.status(200).json({
    success: true,
    message: "delete success",
  });
});
