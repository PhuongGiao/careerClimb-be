"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      JobLocation,
      Level,
      Salary,
      Experience,
      Location,
      Category,
      CV,
      Employer,
      Application,
      User,
      SavedJob,
    }) {
      this.hasMany(JobLocation, {
        foreignKey: "jobId",
        // as: "jobs",
      });
      this.belongsTo(Level, {
        foreignKey: "level",
      });
      this.belongsTo(Category, {
        foreignKey: "category",
      });
      this.belongsTo(Salary, {
        foreignKey: "salary",
      });
      this.belongsTo(Experience, {
        foreignKey: "experience",
      });
      this.belongsTo(User, {
        foreignKey: "employer",
      });
      this.belongsToMany(Location, {
        through: JobLocation,
      });
      this.hasMany(Application, {
        foreignKey: "jobId",
      });
      this.hasMany(SavedJob, {
        foreignKey: "jobId",
      });
    }
  }
  Job.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.INTEGER, //nganh nghe
      level: DataTypes.INTEGER,
      salary: DataTypes.INTEGER,
      experience: DataTypes.INTEGER,
      requirement: DataTypes.STRING,
      benefits: DataTypes.STRING,
      description: DataTypes.STRING,
      location: DataTypes.INTEGER,
      employer: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
