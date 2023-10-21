const express = require("express");
const router = express.Router();
const detailController = require("../controllers/detail-controller");

router.get("/", detailController.getAllDetail);
router.post("/", detailController.addDetail);

module.exports = router;