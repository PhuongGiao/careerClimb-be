"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Employer, SavedJob, MBTI }) {
      this.hasOne(Employer, {
        foreignKey: "userId",
        as: "employerDetail",
      });
      this.hasMany(SavedJob, {
        foreignKey: "userId",
      });
      this.hasMany(MBTI, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      age: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      sex: DataTypes.STRING,
      facebookPicture: DataTypes.STRING,
      facebookEmail: DataTypes.STRING,
      facebookFirstname: DataTypes.STRING,
      facebookLastname: DataTypes.STRING,
      facebookToken: DataTypes.STRING,
      facebookId: DataTypes.STRING,
      googlePicture: DataTypes.STRING,
      googleEmail: DataTypes.STRING,
      googleName: DataTypes.STRING,
      isActivateEmail: DataTypes.BOOLEAN,
      isActivate: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      isDelete: DataTypes.BOOLEAN,
      isCandidate: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
