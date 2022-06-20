"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SignalrNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SignalrNotification.init(
    {
      TenantId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      ConnectionId: DataTypes.STRING,
      OnlineStatus: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,

      modelName: "SignalrNotification",
    }
  );
  return SignalrNotification;
};
