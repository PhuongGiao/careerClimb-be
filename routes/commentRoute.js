const express = require("express");
const { createComment } = require("../controllers/CommentController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const router = express.Router();

router.post("/", jwtAuth, createComment);

module.exports = { router };
