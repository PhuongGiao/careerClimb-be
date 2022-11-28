const express = require("express");
const {
  getAllQuestion,
  createQuestion,
} = require("../controllers/QuestionController");

const router = express.Router();

router.get("/", getAllQuestion);
router.post("/", createQuestion);

module.exports = { router };
