const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");

const { createMBTI, getResult } = require("../controllers/mbti.controller");

const router = express.Router();

router.post("/", jwtAuth, createMBTI);
router.get("/:id", jwtAuth, getResult);
module.exports = { router };
