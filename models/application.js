"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CV, Job }) {
      // define association here
      this.belongsTo(CV, {
        foreignKey: "cvId",
      });
      this.belongsTo(Job, {
        foreignKey: "jobId",
      });
    }
  }
  Application.init(
    {
      jobId: DataTypes.INTEGER,
      cvId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      status: DataTypes.INTEGER,
      intructorName: DataTypes.STRING,
      intructorPhone: DataTypes.STRING,
      intructorEmail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Application",
    }
  );
  return Application;
};
