"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CV extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Job, Application }) {
      this.hasMany(Application, {
        foreignKey: "cvId",
      });
    }
  }
  CV.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      introduction: DataTypes.TEXT,
      cv: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      cvName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CV",
    }
  );
  return CV;
};
