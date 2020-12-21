const Sequelize = require("sequelize");
const connection = require("../database/database");

// relacionando com processos
const Clientes = require("../clientes/Clientes");

// Definndo o modelo (tabela)
const Processos = connection.define("processos", {

  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  numero: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  vara: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  tipo_processo: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  data_peticao: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  status_processo: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  nome_parte_contraria: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  descricao: {
    type: Sequelize.TEXT('long'),
    allowNull: true,
  },

});

//TODO Relacionamento 1 para Muitos
Clientes.hasMany(Processos);

//TODO Relacionamento 1 para 1
Processos.belongsTo(Clientes);

// Sincronizar as atualizaçoes com banco de dados
//Processos.sync({ force: true });
 
module.exports = Processos;  
