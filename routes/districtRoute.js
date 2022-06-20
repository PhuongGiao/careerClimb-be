const express = require("express");
const { createDistrict, getAllDistrict } = require("../controllers/district");

const router = express.Router();

router.post("/", createDistrict);

/**
 * @swagger
 * tags:
 *   name: District
 */

/**
 * @swagger
 * /api/district:
 *   get:
 *     tags: [District]
 *     responses:
 *       200:
 *         description: success
 *
 *
 */
router.get("/", getAllDistrict);

module.exports = { router };
