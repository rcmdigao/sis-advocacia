const express = require("express");
const router = express.Router();

//TODO Imports para geraçao do PDF
const ejs = require("ejs");
const pdf = require("html-pdf");
var options = { format: 'A4', "orientation": "portrait"};
var path = require('path');
var fs = require('fs');
var mime = require('mime');
//var phantom = require('phantom'); 

// Carregando o model
const Cliente = require("../clientes/Clientes");

// Carregando o model
const Movimentacao = require("../movimentacao/Movimentacao");

// Carregando o model
const Processos = require("./Processos");

// Rota de novo processo
router.get("/novo/:id", (req, res) => {
  var id = req.params.id;
  Cliente.findByPk(id).then(clientes => {
    if (clientes != undefined) {
      res.render("admin/processos/cadastro", { cliente: clientes });
    } else {
      res.redirect("/clientes/listar")
    }
  }).catch(erro=>{
    res.redirect("/clientes/listar")
  });
});

// Rota salvar processo
router.post("/save", (req, res) => {
  // tratando os dados
  var cliente = req.body.cliente;
  var titulo = req.body.titulo;
  var numero = req.body.num_processo;
  var vara = req.body.vara;
  var tipoprocesso = req.body.tipo_processo;
  var datapeticao = req.body.data_peticao;
  var status = req.body.status_processo;
  var partecontratia = req.body.parte_contraria;
  var descricao = req.body.descricao;
  //console.log("Id: " + cliente);

  if (titulo != undefined) {
    Processos.create({
      titulo: titulo,
      numero: numero,
      vara: vara,
      tipo_processo: tipoprocesso,
      data_peticao: datapeticao,
      status_processo: status,
      nome_parte_contraria: partecontratia,
      descricao:descricao,
      clienteId: cliente
    }).then(() => {
      res.json({ situacao: 1 });
    });
  } else {
    res.json({ situacao: 2 });
  }
});

// Rota de editar/ver processo
router.get("/editar/:id", (req, res) => {
  var id = req.params.id;
  Processos.findByPk(id).then(processos => {
    if (processos != undefined) {
      Movimentacao.findAll({where: {processoId:id}}).then(movimentacao => {
        Cliente.findByPk(processos.clienteId).then(clientes => {
          res.render("admin/processos/editar", {processos:processos, movimentacao: movimentacao, clientes:clientes });
        });
      });
    } else {
      redirect("/");
    }
  })


});

// Rota de Update
router.post("/update", (req, res) => {

  // tratando os dados
  var id = req.body.id;
  var titulo = req.body.titulo;
  var numero = req.body.num_processo;
  var vara = req.body.vara;
  var tipoprocesso = req.body.tipo_processo;
  var datapeticao = req.body.data_peticao;
  var status = req.body.status_processo;
  var partecontratia = req.body.parte_contraria;
  var descricao = req.body.descricao;

  Processos.update({
    titulo: titulo,
    numero: numero,
    vara: vara,
    tipo_processo: tipoprocesso,
    data_peticao: datapeticao,
    status_processo: status,
    nome_parte_contraria: partecontratia,
    descricao:descricao
  }, 
  { where:{
    id:id
  }}
  ).then(() => {
    res.json({ situacao: 1 });
  });
});

router.post("/excluir", (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      // Excluindo as movimentacoes relacionadas ao processo
      Movimentacao.destroy({
        where:{
          processoId:id
        }
      });
      // Excluindo o processo
      Processos.destroy({
        where:{
          id:id
        }
      }).then(()=>{
        res.json({ situacao: 1 });
      });
  } else {  // Não for numero
    res.redirect("/")
  }
} else { // Null
  res.redirect("/")
}
});

router.post("/peticao", (req, res) => {
  var id = req.body.id;
  //console.log(id);
  //TODO Consultando por id na tabela de processos
  Processos.findByPk(id).then(processos => {
    if (processos != undefined) {
      //TODO Consultando pelo clinteId(FK) na tabela de clientes
        Cliente.findByPk(processos.clienteId).then(clientes => {
          //TODO renderizando o arquivo peticao.ejs (HTML) com os parametros
          ejs.renderFile("./views/admin/processos/peticao.ejs", {nome:clientes.nome, cpf:clientes.cpf_cnpj, rua:clientes.rua, bairro:clientes.bairro, cidade:clientes.cidade, estado:clientes.estado, cep:clientes.cep}, (err, html) =>{
            if (err) {
              res.json({ situacao: 2 });
            } else {
              // TODO Geracao do arquivo pdf com o nome do processo_cliente              
              var range = Math.floor(Math.random() * 65536);
              var arquivo = range + "_" + processos.numero + ".pdf";
              // Salavando o arquivo na pasta public
              pdf.create(html,options).toFile("./public/peticoes/" + arquivo, (err, stream) => {
                if (err) {
                  res.json({ situacao: 2 });
                } else {
                  res.json({ situacao: 1, arquivo: arquivo });
                }
              });
            }
          })
        });
    } else {
      res.json({ situacao: 2 });
    }
  })
});

// Geração de numero randomico
function getRandom(max) {
    return Math.floor(Math.random() * max + 1)
}

module.exports = router;