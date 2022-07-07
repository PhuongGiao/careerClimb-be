"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AdminNotificationKeys", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      GoogleApiFCM: {
        type: Sequelize.STRING,
      },
      AuthKey: {
        type: Sequelize.TEXT("long"),
      },
      P12Certificate: {
        type: Sequelize.BLOB("long"),
      },
      P12Password: {
        type: Sequelize.TEXT("long"),
      },
      P12BundleId: {
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
    await queryInterface.dropTable("AdminNotificationKeys");
  },
};
