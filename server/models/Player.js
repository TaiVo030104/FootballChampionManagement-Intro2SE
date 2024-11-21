const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Player = sequelize.define(
  "Player",
  {
    playerid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playername: { type: DataTypes.STRING(45), allowNull: false },
    birthdate: { type: DataTypes.DATE, allowNull: false },
    playertype: { type: DataTypes.CHAR(10), allowNull: false },
    notes: { type: DataTypes.STRING(45), allowNull: true },
    goalcount: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "player",
    timestamps: false,
  }
);

Player.associate = (models) => {
  Player.belongsTo(models.Team, { foreignKey: "team_teamid", as: "team" });
  Player.hasMany(models.Goal, { foreignKey: "player_playerid", as: "goals" });
};

module.exports = Player;
