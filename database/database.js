const Sequelize = require("sequelize");

/* Conexão Dev
const connection = new Sequelize("ldadvocacia", "root", "@m010283", {
  host: "localhost",
  dialect: "mysql",
});
*/

/* Conexão Prod */
const connection = new Sequelize("sisadvocacia", "sisadvocacia", "62jzKD2JqqJDULx", {
  host: "mysql.sisadvocacia.kinghost.net",
  dialect: "mysql",
});

module.exports = connection;
