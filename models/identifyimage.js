"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IdentifyImage extends Model {
    static associate(models) {}
  }
  IdentifyImage.init(
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      Bytes: DataTypes.BLOB,
      Type: DataTypes.BOOLEAN,
      Site: DataTypes.BOOLEAN,
      PartnerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "IdentifyImage",
    }
  );
  return IdentifyImage;
};
