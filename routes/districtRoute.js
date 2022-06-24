const express = require("express");
const { getAllProvince } = require("../controllers/district");

const router = express.Router();

router.get("/", getAllProvince);

module.exports = { router };
