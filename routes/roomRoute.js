const express = require("express");
const { getAllRoom } = require("../controllers/room");

const router = express.Router();

router.get("/", getAllRoom);

module.exports = { router };
