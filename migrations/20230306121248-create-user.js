"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.STRING,
      },
      sex: {
        type: Sequelize.STRING,
      },
      facebookPicture: {
        type: Sequelize.STRING,
      },
      facebookEmail: {
        type: Sequelize.STRING,
      },
      facebookFirstname: {
        type: Sequelize.STRING,
      },
      facebookLastname: {
        type: Sequelize.STRING,
      },
      facebookToken: {
        type: Sequelize.STRING,
      },
      facebookId: {
        type: Sequelize.STRING,
      },
      googlePicture: {
        type: Sequelize.STRING,
      },
      googleEmail: {
        type: Sequelize.STRING,
      },
      googleName: {
        type: Sequelize.STRING,
      },
      isActivateEmail: {
        type: Sequelize.BOOLEAN,
      },
      isActivate: {
        type: Sequelize.BOOLEAN,
      },
      image: {
        type: Sequelize.STRING,
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
      },
      isCandidate: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Users");
  },
};
