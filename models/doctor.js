"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Specialist }) {
      // this.hasOne(Specialist, {
      //   foreignKey: "specialist",
      //   as: "specialist",
      // });
      this.belongsTo(Specialist, {
        foreignKey: "specialist",
      });
    }
  }
  Doctor.init(
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      yoe: DataTypes.INTEGER,
      shortIntro: DataTypes.TEXT,
      rating: DataTypes.FLOAT,
      treated: DataTypes.INTEGER,
      specialist: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
