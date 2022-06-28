const express = require("express");
const { postPost, getPost } = require("../controllers/postPost");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", upload.array("avata"), postPost);

module.exports = { router };
