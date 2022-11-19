const express = require("express");
const {
  getAllPatientPost,
  createPatientPost,
  updatePatientPost,
  deletePatientPost,
} = require("../controllers/PatientPostController");
const upload = require("../middlewares/upload");
const { jwtAuth } = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/", getAllPatientPost);
router.post("/", jwtAuth, upload.array("image"), createPatientPost);
router.patch("/:id", upload.array("image"), updatePatientPost);
router.delete("/:id", deletePatientPost);

module.exports = { router };
