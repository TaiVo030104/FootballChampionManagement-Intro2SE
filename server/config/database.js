const postgres = require("pg");
const config = require("./config");

const db = new postgres.Client({
  user: config.PG_USER,
  host: config.PG_HOST,
  database: config.PG_DATABASE,
  password: config.PG_PASSWORD,
  port: config.PG_PORT,
});
module.exports = db;
