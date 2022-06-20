"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StudioPosts", {
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
      Price: {
        type: Sequelize.DOUBLE,
      },
      Sales: {
        type: Sequelize.DOUBLE,
      },
      PriceUnit: {
        type: Sequelize.STRING,
      },
      BookingCount: {
        type: Sequelize.INTEGER,
      },
      Description: {
        type: Sequelize.STRING,
      },
      Image1: {
        type: Sequelize.STRING,
      },
      Image2: {
        type: Sequelize.STRING,
      },
      Image3: {
        type: Sequelize.STRING,
      },
      Image4: {
        type: Sequelize.STRING,
      },
      Image5: {
        type: Sequelize.STRING,
      },
      Image6: {
        type: Sequelize.STRING,
      },
      Image7: {
        type: Sequelize.STRING,
      },
      Image8: {
        type: Sequelize.STRING,
      },
      Image9: {
        type: Sequelize.STRING,
      },
      Image10: {
        type: Sequelize.STRING,
      },
      Image11: {
        type: Sequelize.STRING,
      },
      Image12: {
        type: Sequelize.STRING,
      },
      Image13: {
        type: Sequelize.STRING,
      },
      Image14: {
        type: Sequelize.STRING,
      },
      Image15: {
        type: Sequelize.STRING,
      },
      Image16: {
        type: Sequelize.STRING,
      },
      Image17: {
        type: Sequelize.STRING,
      },
      Image18: {
        type: Sequelize.STRING,
      },
      Image19: {
        type: Sequelize.STRING,
      },
      Image20: {
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
    await queryInterface.dropTable("StudioPosts");
  },
};
