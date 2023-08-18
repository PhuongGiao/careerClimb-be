const express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");
const {
  userWithFacebook,
  userWithGoogle,
  me,
  updateUser,
  getAll,
  getDetail,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/fb", userWithFacebook);
router.post("/gg", userWithGoogle);
router.get("/me", me);
router.get("/", getAll);
router.get("/:id", getDetail);
router.patch("/:id", jwtAuth, updateUser);

module.exports = { router };
