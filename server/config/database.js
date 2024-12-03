const postgres = require("pg");
require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  // process.env.PG_DATABASE ||
  "footballmanagement",
  // process.env.PG_USER ||
  "postgres",
  // process.env.PG_PASSWORD ||
  "Postgres@123",
  {
    host:
      // process.env.PG_HOST ||
      "127.0.0.1",
    port:
      // process.env.PG_PORT ||
      5433,
    dialect: "postgres",
    logging: console.log, // Tắt log truy vấn SQL
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
