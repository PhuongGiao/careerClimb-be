"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminNotificationKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdminNotificationKey.init(
    {
      GoogleApiFCM: DataTypes.STRING,
      AuthKey: DataTypes.TEXT("long"),
      P12Certificate: DataTypes.BLOB("long"),
      P12Password: DataTypes.TEXT("long"),
      P12BundleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AdminNotificationKey",
    }
  );
  return AdminNotificationKey;
};
