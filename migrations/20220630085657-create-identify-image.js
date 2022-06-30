"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("IdentifyImages", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      Bytes: {
        type: Sequelize.BLOB("long"),
      },
      Type: {
        type: Sequelize.BOOLEAN,
      },
      Site: {
        type: Sequelize.BOOLEAN,
      },
      PartnerId: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("IdentifyImages");
  },
};
