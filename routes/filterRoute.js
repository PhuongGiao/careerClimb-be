const express = require("express");
const { createDistrict, getAllDistrict } = require("../controllers/district");
const { filterOption } = require("../controllers/filterController");

const router = express.Router();

router.post("/", filterOption);

module.exports = { router };
