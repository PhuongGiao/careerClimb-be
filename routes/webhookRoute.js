const express = require("express");
const { getAllWebhook } = require("../controllers/adminWebhook");

const router = express.Router();

router.get("/", getAllWebhook);

module.exports = { router };
