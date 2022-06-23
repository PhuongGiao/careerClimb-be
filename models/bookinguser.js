"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookingUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ StudioBooking }) {
      // define association here
      BookingUser.hasMany(StudioBooking, {
        as: "bookings",
        foreignKey: "StudioRoomId",
      });
    }
  }
  BookingUser.init(
    {
      Email: DataTypes.STRING,
      Username: DataTypes.STRING,
      Phone: DataTypes.STRING,
      HashPassword: DataTypes.STRING,
      Salt: DataTypes.STRING,
      Fullname: DataTypes.STRING,
      CreatedDate: DataTypes.DATE,
      UpdatedDate: DataTypes.DATE,
      Status: DataTypes.INTEGER,
      UpdatedBy: DataTypes.INTEGER,
      Image: DataTypes.STRING,
      FacebookId: DataTypes.STRING,
      GoogleEmail: DataTypes.STRING,
      FacebookToken: DataTypes.STRING,
      FacebookFirstname: DataTypes.STRING,
      FacebookLastname: DataTypes.STRING,
      FacebookEmail: DataTypes.STRING,
      FacebookPicture: DataTypes.STRING,
      GoogleName: DataTypes.STRING,
      CreationTime: DataTypes.DATE,
      CreatorUserId: DataTypes.BIGINT,
      LastModificationTime: DataTypes.DATE,
      LastModifierUserId: DataTypes.BIGINT,
      IsDeleted: DataTypes.BOOLEAN,
      DeleterUserId: DataTypes.BIGINT,
      DeletionTime: DataTypes.DATE,
      AppleEmail: DataTypes.STRING,
      AppleFamilyName: DataTypes.STRING,
      AppleGivenName: DataTypes.STRING,
      AppleUserIdentifier: DataTypes.STRING,
      TenantId: DataTypes.INTEGER,
      UserTypeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BookingUser",
      timestamps: false,
    }
  );
  return BookingUser;
};
