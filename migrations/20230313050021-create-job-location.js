"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("JobLocations", {
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
      locationId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Locations",
        //   key: "id",
        // },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("JobLocations");
  },
};
