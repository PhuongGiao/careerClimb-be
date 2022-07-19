const express = require("express");
const { getWardsList,getDetailWard, addWard, deleteWard ,updateWard } = require("../controllers/wards");
const router = express.Router();
router.get("/:id",getWardsList);
router.post("/",addWard)
router.get("/wardById/:id",getDetailWard)
router.delete("/wardById/:id",deleteWard)
router.put("/wardById/:id",updateWard)  
module.exports = {router}
