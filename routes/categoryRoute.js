const express = require("express");
const {
  getDetail,
  create,
  getAll,
} = require("../controllers/category.controller");
const { jwtAuth } = require("../middlewares/jwtAuth");

const router = express.Router();

router.get("/", getAll);
router.post("/", create);
router.get("/:id", getDetail);

module.exports = { router };
