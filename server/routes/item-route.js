const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/item-controller");

router.get("/", ItemController.getItem);
router.get("/:id", ItemController.getItemByPk);
router.post("/", ItemController.addItem);
router.delete("/:id", ItemController.deleteItem);
router.put("/:id", ItemController.editItem);

module.exports = router;
