const express = require("express");
const {
  updateAdminNotificationKey,
} = require("../controllers/adminNotificationKey");
const upload = require("../middlewares/upload");

const router = express.Router();

router.patch("/", upload.single("P12Certificate"), updateAdminNotificationKey);

module.exports = { router };
