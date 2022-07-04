const express = require("express");
const {
  createNotification,
  getAllNotification,
  cancelNotification,
  getNotificationById,
} = require("../controllers/adminNotification");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", getAllNotification);
router.post("/", upload.single("image"), createNotification);
router.patch("/:id", cancelNotification);
router.get("/:id", getNotificationById);

module.exports = { router };
