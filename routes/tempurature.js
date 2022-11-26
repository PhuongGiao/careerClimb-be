const express = require("express");
const { getAlll, create, me } = require("../controllers/TempuratureController");
const { jwtAuth } = require("../middlewares/jwtAuth");

const router = express.Router();

router.get("/", getAlll);
router.get("/me", jwtAuth, me);
router.post("/", jwtAuth, create);

module.exports = { router };
