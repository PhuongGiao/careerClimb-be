"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Resource.init(
    {
      TenantId: DataTypes.INTEGER,
      FileData: DataTypes.STRING,
      Description: DataTypes.STRING,
      CreationTime: DataTypes.DATE,
      CreatorUserId: DataTypes.BIGINT,
      LastModificationTime: DataTypes.DATE,
      LastModifierUserId: DataTypes.BIGINT,
      IsDeleted: DataTypes.BOOLEAN,
      DeleterUserId: DataTypes.BIGINT,
      DeletionTime: DataTypes.DATE,
      FileDefault: DataTypes.STRING,
      FileExtension: DataTypes.STRING,
      FileName: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Resource",
    }
  );
  return Resource;
};
