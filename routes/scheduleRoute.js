const express = require("express");
const { getRoomSchedule } = require("../controllers/schedule");

const router = express.Router();

router.get("/", getRoomSchedule);

module.exports = { router };
