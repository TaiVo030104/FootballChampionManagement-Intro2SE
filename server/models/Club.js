const sequelize = require("sequelize");

const Club = sequelize.define("club", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  stadium: {
    type: sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Club;
