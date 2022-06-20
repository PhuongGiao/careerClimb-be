"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ward.init(
    {
      Name: DataTypes.STRING,
      Prefix: DataTypes.STRING,
      DistrictId: DataTypes.INTEGER,
      ProvinceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,

      modelName: "Ward",
    }
  );
  return Ward;
};
