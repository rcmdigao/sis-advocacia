const Sequelize = require("sequelize");
const connection = new Sequelize("ldadvocacia", "root", "@m010283", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
