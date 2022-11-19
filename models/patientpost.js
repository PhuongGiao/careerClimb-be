"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PatientPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PatientPostBinaryObject, Patient }) {
      this.hasMany(PatientPostBinaryObject, {
        foreignKey: "postId",
        as: "images",
      });
      this.belongsTo(Patient, {
        foreignKey: "patientId",
        as: "user",
      });
    }
  }
  PatientPost.init(
    {
      content: DataTypes.TEXT,
      patientId: DataTypes.INTEGER,
      tags: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PatientPost",
    }
  );
  return PatientPost;
};
