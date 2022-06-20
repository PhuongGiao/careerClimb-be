const express = require("express");
const {
  createStudioPost,
  getAllStudioPost,
} = require("../controllers/StudioPost");

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
