const express = require("express");
const { updateBookingUser } = require("../controllers/bookingUser");
const {
  getAllStudioPost,
  getDetailStudioPost,
  updateStudioPost,
} = require("../controllers/studioPost");

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
router.get("/:id", getDetailStudioPost);
router.put("/:id", updateStudioPost);

module.exports = { router };
