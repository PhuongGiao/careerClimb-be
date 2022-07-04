"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AdminNotifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Title: {
        type: Sequelize.STRING,
      },
      Content: {
        type: Sequelize.TEXT("long"),
      },
      Type: {
        type: Sequelize.INTEGER,
      },
      Status: {
        type: Sequelize.INTEGER,
      },
      SendingTime: {
        type: Sequelize.DATE,
      },
      Image: {
        type: Sequelize.STRING,
      },
      Exception: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AdminNotifications");
  },
};
