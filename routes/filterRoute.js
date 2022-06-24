const express = require("express");
const { createDistrict, getAllDistrict } = require("../controllers/district");
const { filterOption } = require("../controllers/filterController");

const router = express.Router();

router.get("/", filterOption);

module.exports = { router };
