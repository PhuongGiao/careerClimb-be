"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudioRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ StudioBooking }) {
      StudioRoom.hasMany(StudioBooking, {
        foreignKey: "StudioRoomId",
      });
    }
  }
  StudioRoom.init(
    {
      TenantId: DataTypes.INTEGER,
      Name: DataTypes.STRING,
      Area: DataTypes.STRING,
      Style: DataTypes.STRING,
      Description: DataTypes.STRING,
      Price: DataTypes.DOUBLE,
      Sales: DataTypes.DOUBLE,
      PriceNote: DataTypes.DOUBLE,
      Image1: DataTypes.STRING,
      Image2: DataTypes.STRING,
      Image3: DataTypes.STRING,
      Image4: DataTypes.STRING,
      Image5: DataTypes.STRING,
      Image6: DataTypes.STRING,
      Image7: DataTypes.STRING,
      Image8: DataTypes.STRING,
      Image9: DataTypes.STRING,
      Image10: DataTypes.STRING,
      Image11: DataTypes.STRING,
      Image12: DataTypes.STRING,
      Image13: DataTypes.STRING,
      Image14: DataTypes.STRING,
      Image15: DataTypes.STRING,
      Image16: DataTypes.STRING,
      Image17: DataTypes.STRING,
      Image18: DataTypes.STRING,
      Image19: DataTypes.STRING,
      Image20: DataTypes.STRING,
      StudioPostId: DataTypes.INTEGER,
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

      modelName: "StudioRoom",
    }
  );
  return StudioRoom;
};
