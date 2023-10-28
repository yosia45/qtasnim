"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Type.hasMany(models.Item, { foreignKey: "typeId" });
    }
  }
  Type.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Type name is registered, please use another type name",
        },
        validate: {
          notNull: { msg: "Type name is required" },
          notEmpty: { msg: "Type name is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Type",
    }
  );
  return Type;
};
