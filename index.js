const express = require("express");
const app = express();
const bodyParser = require("body-parser");//pegar os dados do formulario e passar para javascript
const connection = require("./database/database");
const pergunta = require("./database/Pergunta");
const Pergunta = require("./database/Pergunta");

//DATABASE
connection
.authenticate() // fazer login no mysql
.then(()=>{
    console.log("conexão feita com o banco de dados")
})
.catch((msgErro)=>{ // se falhar ...
    console.log(msgErro);
})

// estou dizendo para o Express usar o EJS como View Engine
app.set('view engine','ejs');
app.use(express.static('public'))
//body parser pegar os dados e traduzir para JS
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
//ROTAS - CAMINHOS WEB
app.get("/",(req,res)=>{
Pergunta.findAll({raw: true}).then(perguntas=>{ // pesquisa e vai receber tds as perguntas do banco de dados
    res.render("index",{
        perguntas: perguntas //recebendo pergunta e mandando para html
    });
})         

});

app.get("/perguntar",(req,res)=>{
res.render("perguntar");
})

app.post("/salvarpergunta",(req,res)=>{ // usar para receber dados de formulario
    var titulo = req.body.titulo; //receber os dados do html na variavel
    var descricao = req.body.descricao; //receber os dados do formulario
    Pergunta.create({               // insert, salvar, colocar
        titulo: titulo,
        descricao: descricao 
    }).then(()=>{
        res.redirect("/");
    });
});
app.listen(8080,()=>{console.log("App rodando!");});
