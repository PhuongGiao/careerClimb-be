'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScheduleAndPriceStudioByDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ScheduleAndPriceStudioByDate.init({
    PriceByDate: DataTypes.DOUBLE,
    PriceByHour: DataTypes.DOUBLE,
    DepositByDate: DataTypes.INTEGER,
    DepositByHour: DataTypes.INTEGER,
    PaymentByDate: DataTypes.BOOLEAN,
    PaymentByHour: DataTypes.BOOLEAN,
    CancelPriceByDate: DataTypes.INTEGER,
    CancelPriceByHour: DataTypes.INTEGER,
    AbsentPriceByDate: DataTypes.INTEGER,
    AbsentPriceByHour: DataTypes.INTEGER,
    FreeCancelByDate: DataTypes.STRING,
    FreeCancelByHour: DataTypes.STRING,
    Open: DataTypes.BOOLEAN,
    Date: DataTypes.STRING,
    RoomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ScheduleAndPriceStudioByDate',
  });
  return ScheduleAndPriceStudioByDate;
};