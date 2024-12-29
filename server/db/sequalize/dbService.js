const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("flowboard", "root", "Ammu@123", {
  host: "localhost",

  // connection pool to optimize performance
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

module.exports = sequelize;
