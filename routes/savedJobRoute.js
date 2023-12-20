const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");
const {
  getSavedJob,
  createSavedJob,
  updateUnsaved,
} = require("../controllers/savedJob.controller");

const router = express.Router();

router.get("/", jwtAuth, getSavedJob);
router.post("/", jwtAuth, createSavedJob);
router.delete("/:jobId", jwtAuth, updateUnsaved);

module.exports = { router };
