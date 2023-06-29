"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Candidates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
      },
      cv: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Categories",
        //   key: "id",
        // },
      },
      level: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Levels",
        //   key: "id",
        // },
      },
      experience: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Experiences",
        //   key: "id",
        // },
      },
      location: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Locations",
        //   key: "id",
        // },
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
    await queryInterface.dropTable("Candidates");
  },
};
