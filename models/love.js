"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Love extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Love.init(
    {
      TenantId: DataTypes.INTEGER,
      PostType: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Love",
      timestamps: false,
    }
  );
  return Love;
};
