const express = require("express");
const { getBookingUserById } = require("../controllers/bookingUser");
const {
  getAllBooking,
  getBookingById,
} = require("../controllers/studioBooking");

const router = express.Router();

router.get("/", getAllBooking);
router.get("/:id", getBookingById);

module.exports = { router };
