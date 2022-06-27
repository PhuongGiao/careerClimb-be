const express = require("express");
const {
  getAllBooking,
  getBookingById,
  updateBookingById,
  filterBooking,
} = require("../controllers/studioBooking");

const router = express.Router();

router.get("/", getAllBooking);
router.get("/:id", getBookingById);
router.patch("/:id", updateBookingById);
router.post("/", filterBooking);

module.exports = { router };
