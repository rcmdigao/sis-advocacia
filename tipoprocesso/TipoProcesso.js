const Sequelize = require("sequelize");
const connection = require("../database/database");


// Definindo o modelo (tabela)
const TipoProcesso = connection.define("tipoprocesso", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});


// Sincronizar as atualizaçoes com banco de dados
// TipoProcesso.sync({ force: true });

module.exports = TipoProcesso;