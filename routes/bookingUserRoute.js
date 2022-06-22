const express = require("express");
const {
  createBookingUser,
  getAllBookingUser,
  updateBookingUser,
} = require("../controllers/bookingUser");

const router = express.Router();

// router.post("/", createBookingUser);
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

/**
 * @swagger
 * /api/booking-user/{id}:
 *  put:
 *    summary: Update the book by the id
 *    tags: [BookingUser]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: id
 *      - in: query
 *        name: email
 *        schema:
 *          type: string
 *        description: email
 *      - in: query
 *        name: Username
 *        schema:
 *          type: string
 *        description: username
 *      - in: query
 *        name: Phone
 *        schema:
 *          type: string
 *        description: phone
 *      - in: query
 *        name: Fullname
 *        schema:
 *          type: string
 *        description: fullname
 *    requestBody:
 *      required: true
 *      
 *
 *    responses:
 *      200:
 *        description: The BookingUser was updated
 *        content:
 *          application/json:
 *            schema:
 *
 *      404:
 *        description: The BookingUser was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", updateBookingUser);

module.exports = {
  router,
};
