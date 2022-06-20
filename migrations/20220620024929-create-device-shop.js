"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DeviceShops", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TenantId: {
        type: Sequelize.INTEGER,
      },
      Name: {
        type: Sequelize.STRING,
      },
      Address: {
        type: Sequelize.STRING,
      },
      Latitude: {
        type: Sequelize.DOUBLE,
      },
      Longtitude: {
        type: Sequelize.DOUBLE,
      },
      Description: {
        type: Sequelize.STRING,
      },
      IsAuthorized: {
        type: Sequelize.BOOLEAN,
      },
      Avatar: {
        type: Sequelize.STRING,
      },
      BookingUserId: {
        type: Sequelize.INTEGER,
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
      HourCloseDefault: {
        type: Sequelize.INTEGER,
      },
      HourOpenDefault: {
        type: Sequelize.INTEGER,
      },
      MinutesCloseDefault: {
        type: Sequelize.INTEGER,
      },
      MinutesOpenDefault: {
        type: Sequelize.INTEGER,
      },
      IsHotDeal: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DeviceShops");
  },
};
