const Sequelize = require("sequelize");
const connection = require("../database/database");


// Definindo o modelo (tabela)
const Tribunal = connection.define("tribunal", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

// Sincronizar as atualizaçoes com banco de dados
//Tribunal.sync({ force: true });

module.exports = Tribunal;