"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PGPromoCodes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TenantId: {
        type: Sequelize.INTEGER,
      },
      Code: {
        type: Sequelize.STRING,
      },
      Description: {
        type: Sequelize.STRING,
      },
      Expired: {
        type: Sequelize.DATE,
      },
      Description: {
        type: Sequelize.STRING,
      },
      Expired: {
        type: Sequelize.DATE,
      },
      Name: {
        type: Sequelize.STRING,
      },
      DiscountAmount: {
        type: Sequelize.DOUBLE,
      },
      PhotographerPostId: {
        type: Sequelize.INTEGER,
      },
      PhotographerServicePackageId: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PGPromoCodes");
  },
};
