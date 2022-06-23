const express = require("express");
const { updateBookingUser } = require("../controllers/bookingUser");
const {
  getAllStudioPost,
  getDetailStudioPost,
  updateStudioPost,
} = require("../controllers/studioPost");

const router = express.Router();

router.get("/", getAllStudioPost);
router.get("/:id", getDetailStudioPost);
router.put("/:id", updateStudioPost);

module.exports = { router };
