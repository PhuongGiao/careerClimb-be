"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdminNotification.init(
    {
      Title: DataTypes.STRING,
      Content: DataTypes.TEXT("long"),
      Type: DataTypes.INTEGER,
      Status: DataTypes.INTEGER,
      SendingTime: DataTypes.DATE,
      Image: DataTypes.STRING,
      Exception: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AdminNotification",
    }
  );
  return AdminNotification;
};
