const express = require("express");

const {
  updateSMTP,
  getSMTPById,
  getSMTP,
  createSMTP,
} = require("../controllers/smtpController");

const router = express.Router();

router.get("/", getSMTP);
router.get("/:id", getSMTPById);
router.post("/", createSMTP);
router.patch("/:id", updateSMTP);

module.exports = { router };
