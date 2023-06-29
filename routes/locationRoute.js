const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");

const {
  getAll,
  create,
  getDetail,
} = require("../controllers/location.controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", create);
router.get("/:id", getDetail); //Luon de cuoi cung

module.exports = { router };
