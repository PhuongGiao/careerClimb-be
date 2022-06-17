const express = require("express");
const {
  createDistrict,
  getAllDistrict,
} = require("../controllers/districtController");

const router = express.Router();

router.post("/post", createDistrict);
router.get("/get", getAllDistrict);

module.exports = router;
