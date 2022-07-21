"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CssFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CssFile.init(
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      Name: DataTypes.STRING,
      Description: DataTypes.STRING,
      CssFile: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "CssFile",
    }
  );
  return CssFile;
};
