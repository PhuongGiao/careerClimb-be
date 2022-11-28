"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PatientPost }) {
      this.belongsTo(PatientPost, {
        foreignKey: "postId",
        as: "comments",
      });
    }
  }
  Comment.init(
    {
      name: DataTypes.STRING,
      comment: DataTypes.STRING,
      isDoctor: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
