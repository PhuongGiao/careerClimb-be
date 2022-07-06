const express = require("express");
const {
  createNotification,
  getAllNotification,
  cancelNotification,
  getNotificationById,
  filterNotification,
} = require("../controllers/adminNotification");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", getAllNotification);
router.post("/", upload.single("image"), createNotification);
router.patch("/:id", cancelNotification);
router.get("/:id", getNotificationById);
router.post("/:fillter", filterNotification);

module.exports = { router };
