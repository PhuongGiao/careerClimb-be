'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ScheduleAndPriceStudioByDates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PriceByDate: {
        type: Sequelize.DOUBLE
      },
      PriceByHour: {
        type: Sequelize.DOUBLE
      },
      DepositByDate: {
        type: Sequelize.INTEGER
      },
      DepositByHour: {
        type: Sequelize.INTEGER
      },
      PaymentByDate: {
        type: Sequelize.BOOLEAN
      },
      PaymentByHour: {
        type: Sequelize.BOOLEAN
      },
      CancelPriceByDate: {
        type: Sequelize.INTEGER
      },
      CancelPriceByHour: {
        type: Sequelize.INTEGER
      },
      AbsentPriceByDate: {
        type: Sequelize.INTEGER
      },
      AbsentPriceByHour: {
        type: Sequelize.INTEGER
      },
      FreeCancelByDate: {
        type: Sequelize.STRING
      },
      FreeCancelByHour: {
        type: Sequelize.STRING
      },
      Open: {
        type: Sequelize.BOOLEAN
      },
      Date: {
        type: Sequelize.STRING
      },
      RoomId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ScheduleAndPriceStudioByDates');
  }
};