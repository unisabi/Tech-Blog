const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.JAWSDB_URL ?? process.env.DB_URL);

module.exports = sequelize;
