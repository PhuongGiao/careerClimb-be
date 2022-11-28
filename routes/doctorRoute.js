const express = require("express");
const {
  register,
  login,
  getDoctorById,
  updateDoctor,
  getallDoctor,
} = require("../controllers/DoctorController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/update", jwtAuth, upload.single("image"), updateDoctor);
router.get("/", getallDoctor);
router.get("/:id", getDoctorById);

module.exports = { router };
