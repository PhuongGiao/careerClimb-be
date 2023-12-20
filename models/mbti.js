"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MBTI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MBTI.init(
    {
      question1: DataTypes.INTEGER,
      question2: DataTypes.INTEGER,
      question3: DataTypes.INTEGER,
      question4: DataTypes.INTEGER,
      question5: DataTypes.INTEGER,
      question6: DataTypes.INTEGER,
      question7: DataTypes.INTEGER,
      question8: DataTypes.INTEGER,
      question9: DataTypes.INTEGER,
      question10: DataTypes.INTEGER,
      question11: DataTypes.INTEGER,
      question12: DataTypes.INTEGER,
      question13: DataTypes.INTEGER,
      question14: DataTypes.INTEGER,
      question15: DataTypes.INTEGER,
      question16: DataTypes.INTEGER,
      question17: DataTypes.INTEGER,
      question18: DataTypes.INTEGER,
      question19: DataTypes.INTEGER,
      question20: DataTypes.INTEGER,
      question21: DataTypes.INTEGER,
      question22: DataTypes.INTEGER,
      question23: DataTypes.INTEGER,
      question24: DataTypes.INTEGER,
      question25: DataTypes.INTEGER,
      question26: DataTypes.INTEGER,
      question27: DataTypes.INTEGER,
      question28: DataTypes.INTEGER,
      question29: DataTypes.INTEGER,
      question30: DataTypes.INTEGER,
      question31: DataTypes.INTEGER,
      question32: DataTypes.INTEGER,
      question33: DataTypes.INTEGER,
      question34: DataTypes.INTEGER,
      question35: DataTypes.INTEGER,
      question36: DataTypes.INTEGER,
      question37: DataTypes.INTEGER,
      question38: DataTypes.INTEGER,
      question39: DataTypes.INTEGER,
      question40: DataTypes.INTEGER,
      question41: DataTypes.INTEGER,
      question42: DataTypes.INTEGER,
      question43: DataTypes.INTEGER,
      question44: DataTypes.INTEGER,
      question45: DataTypes.INTEGER,
      question46: DataTypes.INTEGER,
      question47: DataTypes.INTEGER,
      question48: DataTypes.INTEGER,
      question49: DataTypes.INTEGER,
      question50: DataTypes.INTEGER,
      question51: DataTypes.INTEGER,
      question52: DataTypes.INTEGER,
      question53: DataTypes.INTEGER,
      question54: DataTypes.INTEGER,
      question55: DataTypes.INTEGER,
      question56: DataTypes.INTEGER,
      question57: DataTypes.INTEGER,
      question58: DataTypes.INTEGER,
      question59: DataTypes.INTEGER,
      question60: DataTypes.INTEGER,
      Personality: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MBTI",
    }
  );
  return MBTI;
};
