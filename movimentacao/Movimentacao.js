const Sequelize = require("sequelize");
const connection = require("../database/database");

// relacionando com a movimentacao
const Processos = require("../processos/Processos");

// Defindo o modelo (tabela)
const Movimentacao = connection.define("movimentacao", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  observacao: {
    type: Sequelize.TEXT,
    allowNull: true,
  },

  data: {
    type: Sequelize.STRING,
    allowNull: false,
  }

});

//TODO Relacionamento 1 para Muitos
Processos.hasMany(Movimentacao);

//TODO Relacionamento 1 para 1
Movimentacao.belongsTo(Processos);

// Sincronizar as atualizaçoes com banco de dados
//Movimentacao.sync({ force: true });

module.exports = Movimentacao;