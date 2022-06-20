"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClothesColors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClothesColors.init(
    {
      TenantId: DataTypes.INTEGER,
      Name: DataTypes.STRING,
      Image: DataTypes.STRING,
      ClothesPostId: DataTypes.INTEGER,
      ClothesPostId: DataTypes.INTEGER,
      CreationTime: DataTypes.DATE,
      CreatorUserId: DataTypes.BIGINT,
      DeleterUserId: DataTypes.BIGINT,
      CreatorUserId: DataTypes.BIGINT,
      DeletionTime: DataTypes.DATE,
      IsDeleted: DataTypes.BOOLEAN,
      LastModificationTime: DataTypes.DATE,
      LastModifierUserId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "ClothesColor",
      timestamps: false,
    }
  );
  return ClothesColors;
};
