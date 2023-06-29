const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");

const { apply, create, myCVs } = require("../controllers/cv.controller");

const router = express.Router();

router.post("/apply", jwtAuth, apply);
router.post("/", jwtAuth, create);
router.get("/myCVs", jwtAuth, myCVs);

module.exports = { router };
