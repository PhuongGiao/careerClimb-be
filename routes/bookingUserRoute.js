const express = require("express");
const {
  createBookingUser,
  getAllBookingUser,
} = require("../controllers/bookingUser");

const router = express.Router();

router.post("/", createBookingUser);
 /**
  * @swagger
  * tags:
  *   name: BookingUser
  */


/**
 * @swagger
 * /api/booking-user:
 *   get:
 *     tags: [BookingUser]
 *     responses:
 *       200:
 *         description: success
 *
 *
 */
router.get("/", getAllBookingUser);

module.exports = {
  router,
};
