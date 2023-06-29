const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");

const {
  getAll,
  create,
  getDetail,
  getAllByEmployer,
} = require("../controllers/blog.controller");

const router = express.Router();

router.get("/getByEmployer", jwtAuth, getAllByEmployer);
router.get("/", getAll);
router.post("/", jwtAuth, create);
router.get("/:id", getDetail); //Luon de cuoi cung

module.exports = { router };
