const { Item, Type, Detail, User } = require("../models/index");

class ItemController {
  static async getItem(req, res, next) {
    try {
      let item = await Item.findAll({
        include: [
          {
            model: Type,
          },
          {
            model: User,
            attributes: ["id", "username", "role"],
          },
        ],
        order: [["id", "ASC"]],
      });
      res.status(200).json(item);
    } catch (err) {
      next(err);
    }
  }
  static async getItemByPk(req, res, next) {
    try {
      const id = +req.params.id;
      console.log(id);
      let itemByPk = await Item.findByPk(id, {
        include: [
          {
            model: Detail,
          },
          {
            model: Type,
          },
        ],
      });
      res.status(200).json(itemByPk);
    } catch (err) {
      next(err);
    }
  }
  static async addItem(req, res, next) {
    try {
      const { name, typeId, userId } = req.body;
      let postItem = await Item.create({
        name,
        status: "active",
        typeId,
        userId,
      });
      res.status(201).json(`Success adding new item`);
    } catch (err) {
      next(err);
    }
  }
  static async deleteItem(req, res, next) {
    try {
      const { id } = req.params;
      let findItem = await Item.findByPk(id);
      if (!findItem) {
        throw { name: "NotFound" };
      }
      let deleteItem = await Item.destroy({ where: { id: id } });
      res.status(200).json(`Success deleting Item: ${findItem.name}`);
    } catch (err) {
      next(err);
    }
  }
  static async editItem(req, res, next) {
    try {
      const { id } = req.params;
      let { name, typeId } = req.body;
      let editItem = await Item.update(
        { name: name, typeId: typeId },
        { where: { id: id } }
      );
      res.status(200).json(`Success editing item to ${name}`);
    } catch (err) {
      next(err);
    }
  }
  static async editItemStatus(req, res, next) {
    try {
      const { id } = req.params;
      let { status } = req.body;
      console.log(status)
      let changeItemStatus = await Item.update(
        {
          status: status,
        },
        { where: { id: id } }
      );
      res.status(200).json(`Success editing item status to ${status}`);
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
}

module.exports = ItemController;
