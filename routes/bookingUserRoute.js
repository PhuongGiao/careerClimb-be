const express = require("express");
const {
  getAllBookingUser,
  updateBookingUser,
  getBookingUserById,
  filterBookingUser,
} = require("../controllers/bookingUser");

const router = express.Router();

router.get("/", getAllBookingUser);
router.get("/:id", getBookingUserById);
router.patch("/:id", updateBookingUser);
router.post("/", filterBookingUser);

module.exports = {
  router,
};
