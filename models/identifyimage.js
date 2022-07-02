"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IdentifyImage extends Model {
    static associate({ RegisterPartner }) {
      IdentifyImage.belongsTo(RegisterPartner, {
        foreignKey: "PartnerId",
      });
    }
  }
  IdentifyImage.init(
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      Bytes: DataTypes.BLOB("long"),
      Type: DataTypes.BOOLEAN,
      Site: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "IdentifyImage",
    }
  );
  return IdentifyImage;
};
