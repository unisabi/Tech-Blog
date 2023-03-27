const Sequelize = require("sequelize");
require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env;

const connection =
 process.env.JAWSDB_URL ? 
  new Sequelize(process.env.JAWSDB_URL) :
  new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
  });

module.exports = connection;
