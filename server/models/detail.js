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
      Detail.belongsTo(models.Item, { foreignKey: "itemId" });
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
      initialStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Initial stock is required" },
          notNull: { msg: "Initial stock is required" },
          min: { args: [0], msg: "Minimum initial stock value is 0" },
        },
      },
      stockAddition: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Stock addition is required" },
          notNull: { msg: "Stock addition is required" },
          min: { args: [0], msg: "Minimum Stock addition value is 0" },
        },
      },
      stockBuying: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Stock Buying is required" },
          notNull: { msg: "Stock Buying is required" },
          min: { args: [0], msg: "Minimum Stock Buying value is 0" },
        },
      },
      currentStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Current stock is required" },
          notNull: { msg: "Current stock is required" },
          min: { args: [0], msg: "Minimum Current stock value is 0" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Status is required" },
          notNull: { msg: "Status is required" },
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
