const express = require("express");
const {
  getRoomSchedule,
  updateScheduleByRoomId,
} = require("../controllers/schedule");

const router = express.Router();

router.get("/", getRoomSchedule);
router.patch("/", updateScheduleByRoomId);

module.exports = { router };
