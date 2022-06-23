"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StudioBookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      BookingUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "BookingUsers",
          key: "id",
        },
      },
      TenantId: {
        type: Sequelize.STRING,
      },
      OrderByTime: {
        type: Sequelize.BOOLEAN,
      },
      OrderByTimeFrom: {
        type: Sequelize.DATE,
      },
      OrderByTimeTo: {
        type: Sequelize.DATE,
      },
      OrderByDateFrom: {
        type: Sequelize.DATE,
      },
      OrderByDateTo: {
        type: Sequelize.DATE,
      },
      PaymentType: {
        type: Sequelize.STRING,
      },
      OrderNote: {
        type: Sequelize.STRING,
      },
      BookingUserName: {
        type: Sequelize.STRING,
      },
      BookingPhone: {
        type: Sequelize.STRING,
      },
      BookingEmail: {
        type: Sequelize.STRING,
      },
      StudioRoomId: {
        type: Sequelize.INTEGER,
      },
      BookingUserId: {
        type: Sequelize.INTEGER,
      },
      PromoCodeId: {
        type: Sequelize.INTEGER,
      },
      CreationTime: {
        type: Sequelize.DATE,
      },
      CreatorUserId: {
        type: Sequelize.BIGINT,
      },
      LastModificationTime: {
        type: Sequelize.DATE,
      },
      LastModifierUserId: {
        type: Sequelize.BIGINT,
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
      },
      DeleterUserId: {
        type: Sequelize.BIGINT,
      },
      DeletionTime: {
        type: Sequelize.DATE,
      },
      EvidenceImage: {
        type: Sequelize.STRING,
      },
      IsPayDeposit: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("StudioBookings");
  },
};
