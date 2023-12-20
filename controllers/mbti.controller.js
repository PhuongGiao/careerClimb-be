const catchAsync = require("../middlewares/async");
const { MBTI } = require("../models");
const { Op } = require("sequelize");
const ApiError = require("../utils/ApiError");
const axios = require("axios");

exports.createMBTI = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const MBTIMap = [
    { label: "ENFP", value: 1 },
    { label: "ISFP", value: 13 },
    { label: "INFJ", value: 8 },
    { label: "ISTP", value: 15 },
    { label: "ENFJ", value: 0 },
    { label: "INTJ", value: 10 },
    { label: "ENTJ", value: 2 },
    { label: "ESFP", value: 5 },
    { label: "INFP", value: 9 },
    { label: "INTP", value: 11 },
    { label: "ISTJ", value: 14 },
    { label: "ENTP", value: 3 },
    { label: "ISFJ", value: 12 },
    { label: "ESTJ", value: 6 },
    { label: "ESTP", value: 7 },
    { label: "ESFJ", value: 4 },
  ];

  const { data } = await axios.post(
    "https://b8b9-34-125-237-132.ngrok-free.app/",
    {
      ...req.body,
    }
  );
  const mbti = await MBTI.create({
    ...req.body,
    Personality: MBTIMap.find((val) => val.value === data.kn_result).label,
    userId,
  });
  console.log(
    "🚀 ~ file: mbti.controller.js:39 ~ exports.createMBTI=catchAsync ~ mbti:",
    mbti
  );
  res.status(200).json({
    success: true,
    mbti,
  });
});

exports.getResult = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const data = await MBTI.findByPk(id, {
    where: {
      userId,
    },
  });

  if (!data) {
    throw new ApiError(404, "Blog not found!!!");
  }
  res.status(200).json(data);
});
