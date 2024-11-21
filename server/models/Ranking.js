const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Ranking = sequelize.define(
  "Ranking",
  {
    rank_date: { type: DataTypes.DATE, allowNull: false },
    win: { type: DataTypes.INTEGER, allowNull: false },
    draw: { type: DataTypes.INTEGER, allowNull: false },
    lose: { type: DataTypes.INTEGER, allowNull: false },
    score: { type: DataTypes.INTEGER, allowNull: false },
    rank: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "ranking",
    timestamps: false,
  }
);

Ranking.associate = (models) => {
  Ranking.belongsTo(models.Team, { foreignKey: "team_teamid", as: "team" });
};

module.exports = Ranking;
