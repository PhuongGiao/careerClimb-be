"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Applications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jobId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Jobs",
        //   key: "id",
        // },
      },
      cvId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "CVs",
        //   key: "id",
        // },
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      intructorName: {
        type: Sequelize.STRING,
      },
      intructorPhone: {
        type: Sequelize.STRING,
      },
      intructorEmail: {
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
    await queryInterface.dropTable("Applications");
  },
};
