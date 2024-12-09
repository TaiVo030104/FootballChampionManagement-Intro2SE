const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Account = sequelize.define(
  "Account",
  {
    idaccount: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accountusername: { type: DataTypes.STRING(45), allowNull: false },
    accountpassword: { type: DataTypes.STRING(45), allowNull: false },
  },
  {
    tableName: "account",
    timestamps: false,
  }
);
