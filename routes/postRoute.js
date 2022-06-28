const express = require("express");
const {
  postPost,
  getAllPost,
  getPostById,
  deletePost,
} = require("../controllers/postPost");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", upload.array("image"), postPost);
router.get("/", getAllPost);
router.get("/:id", getPostById);
router.delete("/:id", deletePost);

module.exports = { router };
