"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MBTIs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question1: {
        type: Sequelize.INTEGER,
      },
      question2: {
        type: Sequelize.INTEGER,
      },
      question3: {
        type: Sequelize.INTEGER,
      },
      question4: {
        type: Sequelize.INTEGER,
      },
      question5: {
        type: Sequelize.INTEGER,
      },
      question6: {
        type: Sequelize.INTEGER,
      },
      question7: {
        type: Sequelize.INTEGER,
      },
      question8: {
        type: Sequelize.INTEGER,
      },
      question9: {
        type: Sequelize.INTEGER,
      },
      question10: {
        type: Sequelize.INTEGER,
      },
      question11: {
        type: Sequelize.INTEGER,
      },
      question12: {
        type: Sequelize.INTEGER,
      },
      question13: {
        type: Sequelize.INTEGER,
      },
      question14: {
        type: Sequelize.INTEGER,
      },
      question15: {
        type: Sequelize.INTEGER,
      },
      question16: {
        type: Sequelize.INTEGER,
      },
      question17: {
        type: Sequelize.INTEGER,
      },
      question18: {
        type: Sequelize.INTEGER,
      },
      question19: {
        type: Sequelize.INTEGER,
      },
      question20: {
        type: Sequelize.INTEGER,
      },
      question21: {
        type: Sequelize.INTEGER,
      },
      question22: {
        type: Sequelize.INTEGER,
      },
      question23: {
        type: Sequelize.INTEGER,
      },
      question24: {
        type: Sequelize.INTEGER,
      },
      question25: {
        type: Sequelize.INTEGER,
      },
      question26: {
        type: Sequelize.INTEGER,
      },
      question27: {
        type: Sequelize.INTEGER,
      },
      question28: {
        type: Sequelize.INTEGER,
      },
      question29: {
        type: Sequelize.INTEGER,
      },
      question30: {
        type: Sequelize.INTEGER,
      },
      question31: {
        type: Sequelize.INTEGER,
      },
      question32: {
        type: Sequelize.INTEGER,
      },
      question33: {
        type: Sequelize.INTEGER,
      },
      question34: {
        type: Sequelize.INTEGER,
      },
      question35: {
        type: Sequelize.INTEGER,
      },
      question36: {
        type: Sequelize.INTEGER,
      },
      question37: {
        type: Sequelize.INTEGER,
      },
      question38: {
        type: Sequelize.INTEGER,
      },
      question39: {
        type: Sequelize.INTEGER,
      },
      question40: {
        type: Sequelize.INTEGER,
      },
      question41: {
        type: Sequelize.INTEGER,
      },
      question42: {
        type: Sequelize.INTEGER,
      },
      question43: {
        type: Sequelize.INTEGER,
      },
      question44: {
        type: Sequelize.INTEGER,
      },
      question45: {
        type: Sequelize.INTEGER,
      },
      question46: {
        type: Sequelize.INTEGER,
      },
      question47: {
        type: Sequelize.INTEGER,
      },
      question48: {
        type: Sequelize.INTEGER,
      },
      question49: {
        type: Sequelize.INTEGER,
      },
      question50: {
        type: Sequelize.INTEGER,
      },
      question51: {
        type: Sequelize.INTEGER,
      },
      question52: {
        type: Sequelize.INTEGER,
      },
      question53: {
        type: Sequelize.INTEGER,
      },
      question54: {
        type: Sequelize.INTEGER,
      },
      question55: {
        type: Sequelize.INTEGER,
      },
      question56: {
        type: Sequelize.INTEGER,
      },
      question57: {
        type: Sequelize.INTEGER,
      },
      question58: {
        type: Sequelize.INTEGER,
      },
      question59: {
        type: Sequelize.INTEGER,
      },
      question60: {
        type: Sequelize.INTEGER,
      },
      Personality: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("MBTIs");
  },
};
