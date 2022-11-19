"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PatientPostBinaryObject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PatientPost }) {
      this.belongsTo(PatientPost, {
        foreignKey: "postId",
        as: "images",
      });
    }
  }
  PatientPostBinaryObject.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      bytes: DataTypes.BLOB,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PatientPostBinaryObject",
    }
  );
  return PatientPostBinaryObject;
};
