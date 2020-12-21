const express = require("express");
const router = express.Router();

// Carregando o model
const Cliente = require("./Clientes");

// Rota de novo cliente
router.get("/novo", (req, res) => {
  res.render("admin/clientes/cadastro");
});

// Rota salvar cliente
router.post("/save", (req, res) => {
  // tratando os dados
  var nome = req.body.nome;
  var email = req.body.email;
  var tipopessoa = req.body.tipo_pessoa;
  var cpf = req.body.cpf;

  if (cpf != undefined) {
    var cpf_cnpj = cpf;
  } else {
    var cpf_cnpj = req.body.cnpj;
  }

  var telefone = req.body.telefone;
  var cep = req.body.cep;
  var rua = req.body.rua;
  var bairro = req.body.bairro;
  var cidade = req.body.cidade;
  var estado = req.body.uf;

  //var acao = {};

  if (nome != undefined) {
    Cliente.create({
      nome: nome,
      email: email,
      tipopessoa: tipopessoa,
      cpf_cnpj: cpf,
      telefone: telefone,
      cep: cep,
      rua: rua,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
    }).then(() => {
      //res.redirect("/");

      res.json({ situacao: 1 });
    });
  } else {
    //res.redirect("/clientes/novo");
    res.json({ situacao: 2 });
  }
});

// Rota de listar clientes
router.get("/listar", (req, res) => {
  Cliente.findAll().then((clientes) => {
    res.render("admin/clientes/listar", { clientes: clientes });
  });
});

// Rota exclusao
router.post("/excluir", (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Cliente.destroy({
        where:{
          id:id
        }
      }).then(()=>{
        res.json({ situacao: 1 });
      });
  } else {  // Não for numero
    res.redirect("/clientes/listar")
  }
} else { // Null
  res.redirect("/clientes/listar")
}
});


// Rota de ediçao
router.get("/editar/:id", (req, res) => {
  var id = req.params.id;

  // Validando se numero
  if (isNaN(id)) {
    res.redirect("/clientes/listar")
  }

  Cliente.findByPk(id).then(clientes => {
    if (clientes != undefined) {
      res.render("admin/clientes/editar", { cliente: clientes });
    } else {
      res.redirect("/clientes/listar")
    }
  }).catch(erro=>{
    res.redirect("/clientes/listar")
  });
});


// Rota de Update
router.post("/update", (req, res) => {

  // tratando os dados
  var id = req.body.id;
  var nome = req.body.nome;
  var email = req.body.email;
  var tipopessoa = req.body.tipo_pessoa;
  var cpf = req.body.cpf;

  if (cpf != "") {
    var cpf_cnpj = cpf;
  } else {
    var cpf_cnpj = req.body.cnpj;
  }


  var telefone = req.body.telefone;
  var cep = req.body.cep;
  var rua = req.body.rua;
  var bairro = req.body.bairro;
  var cidade = req.body.cidade;
  var estado = req.body.uf;

  Cliente.update({
    nome: nome,
    email: email,
    tipopessoa: tipopessoa,
    cpf_cnpj: cpf_cnpj,
    telefone: telefone,
    cep: cep,
    rua: rua,
    bairro: bairro,
    cidade: cidade,
    estado: estado,
  }, 
  { where:{
    id:id
  }}
  ).then(() => {
    res.json({ situacao: 1 });
  });


});

module.exports = router;
