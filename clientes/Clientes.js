const Sequelize = require("sequelize");
const connection = require("../database/database");


// Definndo o modelo (tabela)
const Clientes = connection.define("clientes", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  tipopessoa: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  cpf_cnpj: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  cep: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  rua: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  bairro: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  cidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  estado: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  observacao: {
    type: Sequelize.TEXT,
    allowNull: true,
  },

});

// Sincronizar as atualizaçoes com banco de dados
// Clientes.sync({ force: true });

module.exports = Clientes;