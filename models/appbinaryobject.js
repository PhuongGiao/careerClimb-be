"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AppBinaryObject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AppBinaryObject.init(
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      Bytes: DataTypes.BLOB,
      TenantId: DataTypes.INTEGER,
      Description: DataTypes.STRING,
    },
    {
      timestamps: false,
      sequelize,
      modelName: "AppBinaryObject",
    }
  );
  return AppBinaryObject;
};
