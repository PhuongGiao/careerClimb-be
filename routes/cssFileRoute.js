const express = require("express");
const {
  getAllCssFile,
  createCssFile,
  updateCssFile,
  deleteCssFile,
  getCssFileById,
} = require("../controllers/cssFile");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", getAllCssFile);
router.get("/:id", getCssFileById);
router.post("/", upload.single("CssFile"), createCssFile);
router.patch("/:id", upload.single("CssFile"), updateCssFile);
router.delete("/:id", deleteCssFile);

module.exports = { router };
