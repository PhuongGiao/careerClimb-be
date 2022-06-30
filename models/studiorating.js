"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudioRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({StudioPost}) {
      // define association here
      this.belongsTo(StudioPost, {
        foreignKey: "StudioPostId"
      });
    }
  }
  StudioRating.init(
    {
      TenantId: DataTypes.INTEGER,
      Rate: DataTypes.INTEGER,
      Description: DataTypes.STRING,
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
      video1: DataTypes.STRING,
      video2: DataTypes.STRING,
      video3: DataTypes.STRING,
      video4: DataTypes.STRING,
      video5: DataTypes.STRING,
      video6: DataTypes.STRING,
      video7: DataTypes.STRING,
      video8: DataTypes.STRING,
      video9: DataTypes.STRING,
      video10: DataTypes.STRING,
      BookingUserId: DataTypes.INTEGER,
      StudioPostId: DataTypes.INTEGER,
      CreationTime: DataTypes.DATE,
      CreatorUserId: DataTypes.BIGINT,
      LastModificationTime: DataTypes.DATE,
      LastModifierUserId: DataTypes.BIGINT,
      IsDeleted: DataTypes.BOOLEAN,
      DeleterUserId: DataTypes.BIGINT,
      DeletionTime: DataTypes.DATE,
      IsAnonymous: DataTypes.BOOLEAN,
      ReplyComment: DataTypes.STRING,
      StudioRoomId: DataTypes.INTEGER,
      StudioReply: DataTypes.TEXT("long"),
      VideoThumb1: DataTypes.STRING,
      VideoThumb2: DataTypes.STRING,
      VideoThumb3: DataTypes.STRING,
      VideoThumb4: DataTypes.STRING,
      VideoThumb5: DataTypes.STRING,
      VideoThumb6: DataTypes.STRING,
      VideoThumb7: DataTypes.STRING,
      VideoThumb8: DataTypes.STRING,
      VideoThumb9: DataTypes.STRING,
      VideoThumb10: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,

      modelName: "StudioRating",
    }
  );
  return StudioRating;
};
