const express = require("express");
const {
  register,
  login,
  updatePatient,
  getallPatient,
  me,
} = require("../controllers/PatientController");
const { jwtAuth } = require("../middlewares/jwtAuth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/update", jwtAuth, updatePatient);
router.get("/me", me);
router.get("/", getallPatient);

// router.post("/getall", register);

module.exports = { router };
