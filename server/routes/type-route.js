const express = require("express");
const router = express.Router();
const typeController = require("../controllers/type-controller");

router.get("/", typeController.getType);
router.get("/:id", typeController.getTypeById)
router.post("/", typeController.addType);
router.delete("/:id", typeController.deleteType);
router.patch("/:id", typeController.patchType);

module.exports = router;
