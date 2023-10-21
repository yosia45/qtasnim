const express = require("express");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");
const typeRoute = require("./type-route");
const itemRoute = require("./item-route");
const detailRoute = require("./detail-route");

router.use("/items", itemRoute);
router.use("/types", typeRoute);
router.use("/details", detailRoute);
router.use(errorHandler)

module.exports = router;
