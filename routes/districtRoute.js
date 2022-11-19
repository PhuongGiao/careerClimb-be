const express = require("express");
const {
  getDistrictsList,
  getDetailDistrict,
  addDistrict,
  deleteDistrict,
  updateDistrict,
} = require("../controllers/district");
const router = express.Router();
router.get("/:id", getDistrictsList);
router.post("/", addDistrict);
router.get("/districtById/:id", getDetailDistrict);
router.delete("/districtById/:id", deleteDistrict);
router.put("/districtById/:id", updateDistrict);
module.exports = { router };
