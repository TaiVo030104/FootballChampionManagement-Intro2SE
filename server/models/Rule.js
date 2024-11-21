const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Rule = sequelize.define(
  "Rule",
  {
    min_age: { type: DataTypes.INTEGER, allowNull: false },
    max_age: { type: DataTypes.INTEGER, allowNull: false },
    goal_type_count: { type: DataTypes.INTEGER, allowNull: false },
    max_goal_time: { type: DataTypes.INTEGER, allowNull: false },
    win_score: { type: DataTypes.INTEGER, allowNull: false },
    lose_score: { type: DataTypes.INTEGER, allowNull: false },
    draw_score: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "rule",
    timestamps: false,
  }
);

module.exports = Rule;
