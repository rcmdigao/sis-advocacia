const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const gdrive = require("./gdrive")

// TODO Importando as rotas
const processosController = require("./processos/ProcessosController");
const clientesController = require("./clientes/ClientesController");
const movimentacaoController = require("./movimentacao/MovimentacaoController");

// TODO Importando os models
const Processos = require("./processos/Processos");
const Clientes = require("./clientes/Clientes");
const Movimentacao = require("./movimentacao/Movimentacao");

const Vara = require("./vara/Vara");
const TipoProcesso = require("./tipoprocesso/TipoProcesso");
const Tribunal = require("./tribunal/Tribunal");

// TODO View Engine
app.set("view engine", "ejs");

// TODO Body Parser (Formularios) (Coloquei os limites de 50mb)
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

//TODO Arquivos estáticos
app.use(express.static("public"));

// TODO Conexao com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexao realizada com sucesso!");
  })
  .catch((error) => {
    console.log(error);
  });

//TODO Rotas
app.use("/processos", processosController);
app.use("/clientes", clientesController);
app.use("/movimentacao", movimentacaoController);

// TODO Rota inicial (Dashboard)
app.get("/", (req, res) => {
  Processos.findAll({
    include: [{model: Clientes}] // Relacionamento Processos => Clientes
  }).then((processos) => {
    res.render("index", { processos: processos });
  });
});
// TODO Servidor
app.listen(8080, () => {
  console.log("O servidor está rodando");
});


//************************************* */
/* GET home page. */
app.get('/upload', async (req, res, next) => {
  res.render('admin/gdrive/upload', { 
    title: 'Express', 
    audio: '', 
    video: '', 
    image: '', 
    auth: false
  });
});


/* POST auth */
app.post('/auth', async (req, res, next) => {
  const oauthClient = await gdrive.getAuthorization(res);
  res.send(JSON.stringify(oauthClient));
})


/* GET home page. */
app.get('/', async (req, res, next) => {
  let oauthClient;
  if (req.query.code)
    oauthClient = await gdrive.getAccessToken(req, res);
  else
    oauthClient = await gdrive.getAuthorization(res);

  res.render('admin/gdrive/upload', { 
    title: 'Express', 
    audio: '', 
    video: '', 
    image: '', 
    auth: oauthClient != null
  });
});