const express = require("express");
const router = express.Router();
const authn = require("../middlewares/authn");
const UserController = require("../controllers/user-controller");
const errorHandler = require("../middlewares/errorHandler");
const typeRoute = require("./type-route");
const itemRoute = require("./item-route");
const detailRoute = require("./detail-route");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);
router.use("/items", authn, itemRoute);
router.use("/types", authn, typeRoute);
router.use("/details", authn, detailRoute);
router.use(errorHandler);

module.exports = router;
