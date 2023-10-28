const express = require("express");
const router = express.Router();
const detailController = require("../controllers/detail-controller");

router.get("/", detailController.getAllDetail);
router.post("/addstock", detailController.addStock);
router.post("/buystock", detailController.addBuyingStock);

module.exports = router;