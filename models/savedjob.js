"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SavedJob extends Model {
    static associate({ Job, User }) {
      this.belongsTo(Job, {
        foreignKey: "jobId",
      });
      this.belongsTo(User, {
        foreignKey: "userId",
      });
    }
  }
  SavedJob.init(
    {
      userId: DataTypes.INTEGER,
      jobId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SavedJob",
    }
  );
  return SavedJob;
};
