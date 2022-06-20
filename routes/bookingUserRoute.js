const express = require("express");
const {
  createBookingUser,
  getAllBookingUser,
} = require("../controllers/bookingUser");

const router = express.Router();

router.post("/", createBookingUser);
router.get("/", getAllBookingUser);

module.exports = {
  router,
};
