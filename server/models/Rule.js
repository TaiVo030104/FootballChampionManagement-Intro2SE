const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Rule = sequelize.define(
  "Rule",
  {
    ruleid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    minage: { type: DataTypes.INTEGER, allowNull: false },
    maxage: { type: DataTypes.INTEGER, allowNull: false },
    goaltypecount: { type: DataTypes.INTEGER, allowNull: false },
    maxgoaltime: { type: DataTypes.INTEGER, allowNull: false },
    winscore: { type: DataTypes.INTEGER, allowNull: false },
    losescore: { type: DataTypes.INTEGER, allowNull: false },
    drawscore: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "rule",
    timestamps: false,
  }
);

module.exports = Rule;
