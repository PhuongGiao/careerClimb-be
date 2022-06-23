const express = require("express");
const {
  getAllBookingUser,
  updateBookingUser,
  getBookingUserById,
} = require("../controllers/bookingUser");

const router = express.Router();

router.get("/", getAllBookingUser);
router.get("/:id", getBookingUserById);
router.patch("/:id", updateBookingUser);

module.exports = {
  router,
};
