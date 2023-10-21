const { Detail, Item } = require("../models/index");

class DetailController {
  static async getAllDetail(req, res, next) {
    try {
      let detail = await Detail.findAll();
      // console.log(new Date())
      res.status(200).json(detail);
    } catch (err) {
      next(err);
    }
  }
  static async addDetail(req, res, next) {
    try {
      const { transactionDate, stock, totalSoldItem, itemId } = req.body;

      let postType = await Detail.create({
        transactionDate,
        stock,
        totalSoldItem,
        itemId,
      });
      res.status(201).json(`Success adding new transaction!`);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DetailController;
