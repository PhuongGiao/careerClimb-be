const express = require("express");
const {
  getAllBooking,
  getBookingById,
  updateBookingById,
} = require("../controllers/studioBooking");

const router = express.Router();

router.get("/", getAllBooking);
router.get("/:id", getBookingById);
router.patch("/:id", updateBookingById);

module.exports = { router };
