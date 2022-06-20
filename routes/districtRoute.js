const express = require("express");
const {
  createDistrict,
  getAllDistrict,
} = require("../controllers/district");

const router = express.Router();

router.post("/", createDistrict);
router.get("/", getAllDistrict);

module.exports = {router};
