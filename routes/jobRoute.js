const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");

const {
  getAll,
  create,
  getDetail,
  getJobOption,
  updateJob,
  getJobByEmployer,
  getCvByJob,
  history,
  getJobByEmployerPage,
} = require("../controllers/job.controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", jwtAuth, create);
router.get("/option", getJobOption);
router.get("/employer", jwtAuth, getJobByEmployer);
router.get("/cv-by-job", jwtAuth, getCvByJob); //Luon de cuoi cung
router.get("/history", jwtAuth, history); //Luon de cuoi cung
router.get("/employerPage/:id", getJobByEmployerPage);
router.patch("/:id", jwtAuth, updateJob);
router.get("/:id", getDetail); //Luon de cuoi cung

module.exports = { router };
