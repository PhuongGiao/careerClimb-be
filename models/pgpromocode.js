"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PGPromoCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PGPromoCode.init(
    {
      TenantId: DataTypes.INTEGER,
      Code: DataTypes.STRING,
      Description: DataTypes.STRING,
      Expired: DataTypes.DATE,
      Description: DataTypes.STRING,
      Expired: DataTypes.DATE,
      Name: DataTypes.STRING,
      DiscountAmount: DataTypes.DOUBLE,
      PhotographerPostId: DataTypes.INTEGER,
      PhotographerServicePackageId: DataTypes.INTEGER,
      CreationTime: DataTypes.DATE,
      CreatorUserId: DataTypes.BIGINT,
      LastModificationTime: DataTypes.DATE,
      LastModifierUserId: DataTypes.BIGINT,
      IsDeleted: DataTypes.BOOLEAN,
      DeleterUserId: DataTypes.BIGINT,
      DeletionTime: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "PGPromoCode",
    }
  );
  return PGPromoCode;
};
