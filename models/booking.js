"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Patient, Doctor }) {
      this.belongsTo(Patient, {
        foreignKey: "patientId",
        as: "patient",
      });
      this.belongsTo(Doctor, {
        foreignKey: "doctorId",
        as: "doctor",
      });
    }
  }
  Booking.init(
    {
      doctorId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
      bookingFrom: DataTypes.DATE,
      bookingTo: DataTypes.DATE,
      bookingStatus: DataTypes.INTEGER,
      bookingValue: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
