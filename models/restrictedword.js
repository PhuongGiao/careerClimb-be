"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RestrictedWord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RestrictedWord.init(
    {
      TenantId: DataTypes.INTEGER,
      Value: DataTypes.STRING,
      Description: DataTypes.STRING,
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
      modelName: "RestrictedWord",
    }
  );
  return RestrictedWord;
};
