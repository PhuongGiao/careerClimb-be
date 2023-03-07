"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PatientDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  PatientDetail.init(
    {
      userId: DataTypes.INTEGER,
      weight: DataTypes.FLOAT,
      height: DataTypes.FLOAT,
      healthStatus: DataTypes.STRING,
      medicalHistory: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PatientDetail",
    }
  );
  return PatientDetail;
};
