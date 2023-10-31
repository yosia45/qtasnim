const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/item-controller");

router.get("/", ItemController.getItem);
router.post("/", ItemController.addItem);
router.get("/:id", ItemController.getItemByPk);
router.put("/:id", ItemController.editItem);
router.patch("/:id", ItemController.editItemStatus);
router.delete("/:id", ItemController.deleteItem);

module.exports = router;
