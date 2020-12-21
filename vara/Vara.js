const Sequelize = require("sequelize");
const connection = require("../database/database");


// Definindo o modelo (tabela)
const Vara = connection.define("vara", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

// Sincronizar as atualizaçoes com banco de dados
//Vara.sync({ force: true });

module.exports = Vara;