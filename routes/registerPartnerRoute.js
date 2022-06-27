const express = require("express");
const {
  getAllRegisterPartner,
  getPartnerById,
  updatePartnerById,
  filterPartner,
} = require("../controllers/registerPartner");

const router = express.Router();

router.get("/", getAllRegisterPartner);
router.get("/:id", getPartnerById);
router.patch("/update/:id", updatePartnerById);
router.post("/filter", filterPartner);

module.exports = { router };
