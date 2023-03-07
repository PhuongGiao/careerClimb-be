'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DoctorDetail.init({
    userId: DataTypes.INTEGER,
    experiences: DataTypes.INTEGER,
    graduated: DataTypes.STRING,
    introduction: DataTypes.STRING,
    skill: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DoctorDetail',
  });
  return DoctorDetail;
};