const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Match = sequelize.define(
  "Match",
  {
    matchid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    match_date: { type: DataTypes.DATEONLY, allowNull: false },
    match_time: { type: DataTypes.TIME, allowNull: false },
    round_count: { type: DataTypes.INTEGER, allowNull: false },
    fieldname: { type: DataTypes.STRING(45), allowNull: false },
    score1: { type: DataTypes.INTEGER, allowNull: true },
    score2: { type: DataTypes.INTEGER, allowNull: true },
    team_team1: { type: DataTypes.INTEGER, allowNull: false },
    team_team2: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "match",
    timestamps: false,
  }
);

Match.associate = (models) => {
  Match.belongsTo(models.Team, { foreignKey: "team_team1", as: "team1" });
  Match.belongsTo(models.Team, { foreignKey: "team_team2", as: "team2" });
  Match.hasMany(models.Goal, { foreignKey: "match_matchid", as: "goals" });
};

module.exports = Match;
