const postgres = require("pg");
require("dotenv").config();
const { Sequelize } = require("sequelize");
console.log("Database:", process.env.PG_DATABASE);
console.log("User:", process.env.PG_USER);
console.log("Password:", process.env.PG_PASSWORD);
console.log("Host:", process.env.PG_HOST);
console.log("Port:", process.env.PG_PORT);
const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: "postgres",
    logging: false, // Tắt log truy vấn SQL
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
module.exports = sequelize;
