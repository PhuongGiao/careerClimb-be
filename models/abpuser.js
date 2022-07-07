"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AbpUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AbpUser.init(
    {
      AccessFailedCount: DataTypes.INTEGER,
      AuthenticationSource: DataTypes.STRING,
      ConcurrencyStamp: DataTypes.STRING,
      CreationTime: DataTypes.DATE,
      CreatorUserId: DataTypes.BIGINT,
      DeleterUserId: DataTypes.BIGINT,
      DeletionTime: DataTypes.DATE,
      EmailAddress: DataTypes.STRING,
      EmailConfirmationCode: DataTypes.STRING,
      IsActive: DataTypes.BOOLEAN,
      IsDeleted: DataTypes.BOOLEAN,
      IsEmailConfirmed: DataTypes.BOOLEAN,
      IsLockoutEnabled: DataTypes.BOOLEAN,
      IsPhoneNumberConfirmed: DataTypes.BOOLEAN,
      IsTwoFactorEnabled: DataTypes.BOOLEAN,
      LastModificationTime: DataTypes.BOOLEAN,
      LastModifierUserId: DataTypes.BIGINT,
      LockoutEndDateUtc: DataTypes.DATE,
      Name: DataTypes.STRING,
      NormalizedEmailAddress: DataTypes.STRING,
      NormalizedUserName: DataTypes.STRING,
      Password: DataTypes.STRING,
      PasswordResetCode: DataTypes.STRING,
      PhoneNumber: DataTypes.STRING,
      ProfilePictureId: DataTypes.STRING,
      SecurityStamp: DataTypes.STRING,
      ShouldChangePasswordOnNextLogin: DataTypes.BOOLEAN,
      Surname: DataTypes.STRING,
      TenantId: DataTypes.INTEGER,
      UserName: DataTypes.STRING,
      SignInToken: DataTypes.STRING,
      SignInTokenExpireTimeUtc: DataTypes.DATE,
      GoogleAuthenticatorKey: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AbpUser",
      timestamps: false,
    }
  );
  return AbpUser;
};
