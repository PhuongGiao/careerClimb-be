const express = require("express");
const { createLove, getLovesByPostId } = require("../controllers/likes");


const router = express.Router();

router.post("/", createLove);
router.get("/:id", getLovesByPostId);

module.exports = { router };
