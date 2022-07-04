const express = require("express");
const {
  createComment,
  getCommentsByPostId,
} = require("../controllers/comment");

const router = express.Router();

router.post("/", createComment);
router.get("/:id", getCommentsByPostId);

module.exports = { router };
