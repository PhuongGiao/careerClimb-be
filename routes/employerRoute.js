const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");

const {
  getAll,
  create,
  getDetail,
  updateEmployer,
} = require("../controllers/employer.controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", jwtAuth, create);
router.patch("/", jwtAuth, updateEmployer);
router.get("/:id", getDetail); //Luon de cuoi cung

module.exports = { router };
