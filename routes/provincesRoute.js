const express = require("express");
const { getProvincesList, getDetailProvince, addProvince, deleteProvince, updateProvince } = require("../controllers/provinces");

const router = express.Router();

router.get("/",getProvincesList)
router.get("/:Id",getDetailProvince)
router.post("/",addProvince)
router.delete("/:Id",deleteProvince)
router.put("/:Id",updateProvince)
module.exports = {router}