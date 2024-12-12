const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Team = sequelize.define(
  "Team",
  {
    teamid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    teamname: { type: DataTypes.STRING(45), allowNull: false },
    fieldname: { type: DataTypes.STRING(45), allowNull: false },
  },
  {
    tableName: "team",
    timestamps: false,
  }
);

Team.associate = (models) => {
  Team.hasMany(models.Player, { foreignKey: "team_teamid", as: "players" });
  Team.hasMany(models.Ranking, { foreignKey: "team_teamid", as: "rankings" });
  Team.hasMany(
    models.Match,
    { foreignKey: "team_team1", as: "team1" },
    { foreignKey: "team_team2", as: "team2" }
  );
};
module.exports = Team;
