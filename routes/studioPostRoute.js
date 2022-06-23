const express = require("express");
const { updateBookingUser } = require("../controllers/bookingUser");
const { getAllStudioPost } = require("../controllers/studioPost");

const router = express.Router();

router.get("/", getAllStudioPost);

module.exports = { router };
