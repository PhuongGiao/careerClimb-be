const express = require("express");
const { postPost, getPost } = require("../controllers/postPost");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", upload.single("avata"), postPost);
router.get("/", getPost);

module.exports = { router };
