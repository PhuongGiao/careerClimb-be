const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");

const {
  createPaientDetail,
  updatePaientDetail,
} = require("../controllers/patient.controller");

const router = express.Router();

router.post("/", jwtAuth, createPaientDetail);
router.patch("/", jwtAuth, updatePaientDetail);

module.exports = { router };
