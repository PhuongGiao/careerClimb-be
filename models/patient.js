'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    healthPoint: DataTypes.INTEGER,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};