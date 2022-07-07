"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AbpUsers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      AccessFailedCount: {
        type: Sequelize.INTEGER,
      },
      AuthenticationSource: {
        type: Sequelize.STRING,
      },
      ConcurrencyStamp: {
        type: Sequelize.STRING,
      },
      CreationTime: {
        type: Sequelize.DATE,
      },
      CreatorUserId: {
        type: Sequelize.BIGINT,
      },
      DeleterUserId: {
        type: Sequelize.BIGINT,
      },
      DeletionTime: {
        type: Sequelize.DATE,
      },
      EmailAddress: {
        type: Sequelize.STRING,
      },
      EmailConfirmationCode: {
        type: Sequelize.STRING,
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
      },
      IsEmailConfirmed: {
        type: Sequelize.BOOLEAN,
      },
      IsLockoutEnabled: {
        type: Sequelize.BOOLEAN,
      },
      IsPhoneNumberConfirmed: {
        type: Sequelize.BOOLEAN,
      },
      IsTwoFactorEnabled: {
        type: Sequelize.BOOLEAN,
      },
      LastModificationTime: {
        type: Sequelize.BOOLEAN,
      },
      LastModifierUserId: {
        type: Sequelize.BIGINT,
      },
      LockoutEndDateUtc: {
        type: Sequelize.DATE,
      },
      Name: {
        type: Sequelize.STRING,
      },
      NormalizedEmailAddress: {
        type: Sequelize.STRING,
      },
      NormalizedUserName: {
        type: Sequelize.STRING,
      },
      Password: {
        type: Sequelize.STRING,
      },
      PasswordResetCode: {
        type: Sequelize.STRING,
      },
      PhoneNumber: {
        type: Sequelize.STRING,
      },
      ProfilePictureId: {
        type: Sequelize.STRING,
      },
      SecurityStamp: {
        type: Sequelize.STRING,
      },
      ShouldChangePasswordOnNextLogin: {
        type: Sequelize.BOOLEAN,
      },
      Surname: {
        type: Sequelize.STRING,
      },
      TenantId: {
        type: Sequelize.INTEGER,
      },
      UserName: {
        type: Sequelize.STRING,
      },
      SignInToken: {
        type: Sequelize.STRING,
      },
      SignInTokenExpireTimeUtc: {
        type: Sequelize.DATE,
      },
      GoogleAuthenticatorKey: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AbpUsers");
  },
};
