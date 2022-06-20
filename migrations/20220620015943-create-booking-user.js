"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BookingUsers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Email: {
        type: Sequelize.STRING,
      },
      Username: {
        type: Sequelize.STRING,
      },
      Phone: {
        type: Sequelize.STRING,
      },
      HashPassword: {
        type: Sequelize.STRING,
      },
      Salt: {
        type: Sequelize.STRING,
      },
      Fullname: {
        type: Sequelize.STRING,
      },
      CreatedDate: {
        type: Sequelize.DATE,
      },
      UpdatedDate: {
        type: Sequelize.DATE,
      },
      Status: {
        type: Sequelize.INTEGER,
      },
      UpdatedBy: {
        type: Sequelize.INTEGER,
      },
      Image: {
        type: Sequelize.STRING,
      },
      FacebookId: {
        type: Sequelize.STRING,
      },
      GoogleEmail: {
        type: Sequelize.STRING,
      },
      FacebookToken: {
        type: Sequelize.STRING,
      },
      FacebookFirstname: {
        type: Sequelize.STRING,
      },
      FacebookLastname: {
        type: Sequelize.STRING,
      },
      FacebookEmail: {
        type: Sequelize.STRING,
      },
      FacebookPicture: {
        type: Sequelize.STRING,
      },
      GoogleName: {
        type: Sequelize.STRING,
      },
      CreationTime: {
        type: Sequelize.DATE,
      },
      CreatorUserId: {
        type: Sequelize.BIGINT,
      },
      LastModificationTime: {
        type: Sequelize.DATE,
      },
      LastModifierUserId: {
        type: Sequelize.BIGINT,
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
      },
      DeleterUserId: {
        type: Sequelize.BIGINT,
      },
      DeletionTime: {
        type: Sequelize.DATE,
      },
      AppleEmail: {
        type: Sequelize.STRING,
      },
      AppleFamilyName: {
        type: Sequelize.STRING,
      },
      AppleGivenName: {
        type: Sequelize.STRING,
      },
      AppleUserIdentifier: {
        type: Sequelize.STRING,
      },
      TenantId: {
        type: Sequelize.INTEGER,
      },
      UserTypeId: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BookingUsers");
  },
};
