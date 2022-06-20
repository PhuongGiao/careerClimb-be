"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NotificationToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NotificationToken.init(
    {
      TenantId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      Token: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "NotificationToken",
    }
  );
  return NotificationToken;
};
