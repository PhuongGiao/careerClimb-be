"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Job, Location }) {
      this.belongsTo(Job, {
        foreignKey: "jobId",
      });
      this.belongsTo(Location, {
        foreignKey: "locationId",
      });
    }
  }
  JobLocation.init(
    {
      jobId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "JobLocation",
      timestamps: false,
    }
  );
  return JobLocation;
};
