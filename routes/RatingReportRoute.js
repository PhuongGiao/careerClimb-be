const express = require("express");
const {
  getALL,
  getDetailById,
  getRatingByPostId,
} = require("../controllers/ratingReport");

const router = express.Router();

router.get("/", getALL);
router.get("/:id", getDetailById);
router.get("/rating/:id", getRatingByPostId);
module.exports = { router };
