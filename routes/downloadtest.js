const express = require("express");
const { downloadExcel } = require("../controllers/ excel.controller");
const router = express.Router();

router.get("/download", downloadExcel);

module.exports = { router };
