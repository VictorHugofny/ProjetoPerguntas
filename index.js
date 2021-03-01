const express = require("express");
const app = express();
const bodyParser = require("body-parser");//pegar os dados do formulario e passar para javascript
const connection = require("./database/database");
const pergunta = require("./database/Pergunta");
const Pergunta = require("./database/Pergunta"); // perguntas dentro do banco de dados

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
Pergunta.findAll({raw: true, order:[ //RECEBER AS PERGUNTAS DO BANCO DE DADOS
    ['id','DESC'] // ASC = Crescente DESC = DESCRECENTE, ORDENANDO EM ORDEM AS PERGUNTAS
]}).then(perguntas=>{ // pesquisa e vai receber tds as perguntas do banco de dados
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

app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id} //buscar o mesmo id que foi escolhido pelo usuario
    }) //buscar um dado do banco de dados
}); // rota com parametro
app.listen(8080,()=>{console.log("App rodando!");});
