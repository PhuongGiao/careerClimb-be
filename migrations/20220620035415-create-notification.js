"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TenantId: {
        type: Sequelize.INTEGER,
      },
      ResourceKey: {
        type: Sequelize.STRING,
      },
      Param1: {
        type: Sequelize.STRING,
      },
      ParamId1: {
        type: Sequelize.INTEGER,
      },
      Param2: {
        type: Sequelize.STRING,
      },
      ParamId2: {
        type: Sequelize.INTEGER,
      },
      Image: {
        type: Sequelize.STRING,
      },
      PublishDate: {
        type: Sequelize.DATE,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      IsRead: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Notifications");
  },
};
