const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Goal = sequelize.define(
  "Goal",
  {
    goal_time: { type: DataTypes.TIME, allowNull: false },
    goal_type: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "goal",
    timestamps: false,
  }
);

Goal.associate = (models) => {
  Goal.belongsTo(models.Match, { foreignKey: "match_matchid", as: "match" });
  Goal.belongsTo(models.Player, {
    foreignKey: "pPlayer_playerid",
    as: "player",
  });
};

module.exports = Goal;
