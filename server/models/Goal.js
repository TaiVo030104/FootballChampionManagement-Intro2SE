const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Goal = sequelize.define(
  "Goal",
  {
    goal_time: { type: DataTypes.TEXT, allowNull: false, primaryKey: true },
    goal_type: { type: DataTypes.INTEGER, allowNull: false },
    match_matchid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    player_playerid: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "goal",
    timestamps: false,
  }
);

Goal.associate = (models) => {
  Goal.belongsTo(models.Match, { foreignKey: "match_matchid", as: "match" });
  Goal.belongsTo(models.Player, {
    foreignKey: "player_playerid",
    as: "player",
  });
};

module.exports = Goal;
