const { Detail, Item } = require("../models/index");

class DetailController {
  static async getAllDetail(req, res, next) {
    try {
      let detail = await Detail.findAll();
      res.status(200).json(detail);
    } catch (err) {
      next(err);
    }
  }
  static async addStock(req, res, next) {
    try {
      const { transactionDate, stockAddition, itemId } = req.body;
      let findDetail = await Item.findByPk(itemId, {
        include: {
          model: Detail,
        },
      });
      let initialStock;
      if (findDetail.Details.length === 0) {
        initialStock = 0;
      } else {
        initialStock =
          findDetail.Details[findDetail.Details.length - 1].currentStock;
      }
      let currentStock = +initialStock + +stockAddition;
      let postType = await Detail.create({
        transactionDate,
        initialStock,
        stockAddition,
        stockBuying: 0,
        status: "Adding Stock",
        currentStock,
        itemId,
      });
      res.status(201).json(`Success add ${stockAddition} stocks !`);
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
  static async addBuyingStock(req, res, next) {
    try {
      const { transactionDate, stockBuying, itemId } = req.body;
      let findDetail = await Item.findByPk(itemId, {
        include: {
          model: Detail,
        },
      });
      let initialStock;
      if (findDetail.Details.length === 0 || initialStock===0) {
        throw { name: "EmptyStock" };
      } else {
        initialStock =
          findDetail.Details[findDetail.Details.length - 1].currentStock;
      }
      if (stockBuying > initialStock) {
        throw { name: "OverBuying" };
      }
      let currentStock = +initialStock - +stockBuying;
      let postType = await Detail.create({
        transactionDate,
        initialStock,
        stockAddition:0,
        stockBuying,
        status: "Stock Buying",
        currentStock,
        itemId,
      });
      res.status(201).json(`Success buying ${stockBuying} stocks !`);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DetailController;
