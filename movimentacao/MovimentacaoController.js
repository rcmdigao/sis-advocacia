const express = require("express");
const router = express.Router();

// Carregando o model
const Processos = require("../processos/Processos");

// Carregando o model
const Movimentacao = require("./Movimentacao");

// Rota de nova movimentacao
router.get("/novo/:id", (req, res) => {
  var id = req.params.id;
  Processos.findByPk(id).then(processos => {
    if (processos != undefined) {
      res.render("admin/movimentacao/cadastro", { processos: processos });
    } else {
      res.redirect("/")
    }
  }).catch(erro=>{
    res.redirect("/")
  });
});

// Rota salvar processo
router.post("/save", (req, res) => {
  // tratando os dados
  var processo = req.body.processo;
  var titulo = req.body.titulo;
  var observacao = req.body.observacao;
  var data = req.body.data_movimento;

  if (titulo != undefined) {
    Movimentacao.create({
      titulo: titulo,
      observacao: observacao,
      data: data,
      processoId: processo // chave estrageira
    }).then(() => {
      res.json({ situacao: 1 });
    });
  } else {
    res.json({ situacao: 2 });
  }
});

// TODO Rota inicial (Dashboard)
router.get("/listar", (req, res) => {
    Movimentacao.findAll({
      include: [{model: Processos}] // Relacionamento Processos => Clientes
    }).then((movimentacao) => {
      res.render("admin/movimentacao/listar", { movimentacao: movimentacao });
    });
  });






module.exports = router;