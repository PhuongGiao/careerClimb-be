const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");

const {
  getApplicationByJob,
  updateApplicationStatus,
  create,
  updateIntructor,
  updateRefuse,
  sendMailConfirm,
  getMyCVs,
} = require("../controllers/application.controller");

const router = express.Router();

router.get("/", getApplicationByJob);
router.post("/", create);
router.get("/getMyCvs", jwtAuth, getMyCVs);
router.patch("/intructor/:id", updateIntructor);
router.patch("/refuse/:id", updateRefuse);
router.patch("/:id", updateApplicationStatus);
router.get("/:id", sendMailConfirm);

module.exports = { router };
