"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
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
      salary: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Salaries",
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
      requirement: {
        type: Sequelize.STRING,
      },
      benefits: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
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
      employer: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Jobs");
  },
};
