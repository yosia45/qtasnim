"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Detail.belongsTo(models.Item, {foreignKey:"itemId"})
    }
  }
  Detail.init(
    {
      transactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Transaction date is required" },
          notNull: { msg: "Transaction date is required" },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: [0], msg: "Minimum stock is 0" },
          notEmpty: { msg: "Stock value is required" },
          notEmpty: { msg: "Stock value is required" },
        },
      },
      totalSoldItem: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: [0], msg: "Minimum total sold item value is 0" },
          notEmpty: { msg: " Total sold item is required" },
          notNull: { msg: "Total sold item is required" },
        },
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Item ID is required" },
          notNull: { msg: "Item ID is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Detail",
    }
  );
  return Detail;
};
