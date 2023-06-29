"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Job }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: "userId",
      });
      // this.hasMany(Job, {
      //   foreignKey: "jobId",
      // });
    }
  }
  Employer.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Employer",
    }
  );
  return Employer;
};
