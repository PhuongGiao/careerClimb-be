const express = require("express");
const {
  getAllRegisterPartner,
  getPartnerById,
  updatePartnerById,
} = require("../controllers/registerPartner");

const router = express.Router();

router.get("/", getAllRegisterPartner);
router.get("/:id", getPartnerById);
router.patch("/update/:id", updatePartnerById);

module.exports = { router };
