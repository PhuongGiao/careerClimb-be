const express = require("express");
const { updateBookingUser } = require("../controllers/bookingUser");
const { getAllStudioPost } = require("../controllers/studioPost");

const router = express.Router();

// router.post("/", createStudioPost);

/**
 * @swagger
 * tags:
 *   name: StudioPost
 */

/**
 * @swagger
 * /api/studio-post:
 *   get:
 *     tags: [StudioPost]
 *     responses:
 *       200:
 *         description: success
 *
 *
 */
router.get("/", getAllStudioPost);



module.exports = { router };
