const express = require("express");
const router = express.Router();
const typeController = require("../controllers/type-controller");

router.get("/", typeController.getType);
router.post("/", typeController.addType);
router.get("/:id", typeController.getTypeById)
router.delete("/:id", typeController.deleteType);
router.patch("/:id", typeController.patchType);

module.exports = router;
