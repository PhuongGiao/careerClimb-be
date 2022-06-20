"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RegisterPartner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RegisterPartner.init(
    {
      TenantId: DataTypes.INTEGER,
      PartnerName: DataTypes.STRING,
      RepresentativeName: DataTypes.STRING,
      Phone: DataTypes.STRING,
      OtherPhone: DataTypes.STRING,
      Email: DataTypes.STRING,
      ReEmail: DataTypes.STRING,
      BusinessRegistrationLicenseNumber: DataTypes.STRING,
      Address: DataTypes.STRING,
      BankBranchName: DataTypes.STRING,
      BankAccount: DataTypes.STRING,
      BankAccountOwnerName: DataTypes.STRING,
      AutoGeneratedPassword: DataTypes.STRING,
      CreationTime: DataTypes.DATE,
      CreatorUserId: DataTypes.BIGINT,
      LastModificationTime: DataTypes.DATE,
      LastModifierUserId: DataTypes.BIGINT,
      IsDeleted: DataTypes.BOOLEAN,
      DeleterUserId: DataTypes.BIGINT,
      DeletionTime: DataTypes.DATE,
      BusinessType: DataTypes.STRING,
      PersonalIdentity: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "RegisterPartner",
    }
  );
  return RegisterPartner;
};