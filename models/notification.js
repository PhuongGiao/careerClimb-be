"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notification.init(
    {
      TenantId: DataTypes.INTEGER,
      ResourceKey: DataTypes.STRING,
      Param1: DataTypes.STRING,
      ParamId1: DataTypes.INTEGER,
      Param2: DataTypes.STRING,
      ParamId2: DataTypes.INTEGER,
      Image: DataTypes.STRING,
      PublishDate: DataTypes.DATE,
      UserId: DataTypes.INTEGER,
      IsRead: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Notification",
    }
  );
  return Notification;
};
