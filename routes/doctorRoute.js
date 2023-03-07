const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");

const {
  createDoctorDetail,
  updateDoctorDetail,
} = require("../controllers/doctor.controller");

const router = express.Router();

router.post("/", jwtAuth, createDoctorDetail);
router.patch("/", jwtAuth, updateDoctorDetail);

module.exports = { router };
