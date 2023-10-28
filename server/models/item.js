"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Type, { foreignKey: "typeId" });
      Item.hasMany(models.Detail, { foreignKey: "itemId" });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Item name already registered, please use another item name",
        },
        validate: {
          notNull: { msg: "Item name is required" },
          notEmpty: { msg: "Item name is required" },
        },
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Type is required" },
          notEmpty: { msg: "Type is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
