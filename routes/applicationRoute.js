const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");

const {
  getApplicationByJob,
  updateApplicationStatus,
  create,
  updateIntructor,
  updateRefuse,
} = require("../controllers/application.controller");

const router = express.Router();

router.get("/", getApplicationByJob);
router.post("/", create);
router.patch("/:id", updateApplicationStatus);
router.patch("/intructor/:id", updateIntructor);
router.patch("/refuse/:id", updateRefuse);

module.exports = { router };
