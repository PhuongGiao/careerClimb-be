const express = require("express");
const {
  createSpecialist,
  getAlll,
} = require("../controllers/SpecialistController");

const router = express.Router();

router.post("/", createSpecialist);
router.get("/", getAlll);

module.exports = { router };
