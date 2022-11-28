const express = require("express");
const {
  getallMyBooking,
  createBooking,
  createBookingStatus,
  cancelBooking,
} = require("../controllers/BookingController");
const { jwtAuth } = require("../middlewares/jwtAuth");

const router = express.Router();

router.get("/", jwtAuth, getallMyBooking);
router.post("/", jwtAuth, createBooking);
router.post("/booking-status", createBookingStatus);
router.patch("/:id", cancelBooking);

module.exports = { router };
