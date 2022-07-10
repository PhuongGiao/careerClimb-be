const express = require("express");
const {
  createNotification,
  getAllNotification,
  cancelNotification,
  getNotificationById,
  filterNotification,
  getAllUser,
} = require("../controllers/adminNotification");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/noti", getAllNotification);
router.post("/", upload.single("image"), createNotification);
router.patch("/:id", cancelNotification);
router.get("/noti/:id", getNotificationById);
router.post("/:fillter", filterNotification);
router.get("/user", getAllUser);

module.exports = { router };
