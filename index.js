const express = require("express");
const app = express();
const bodyParser = require("body-parser");//pegar os dados do formulario e passar para javascript
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta"); // perguntas dentro do banco de dados
const Resposta = require("./database/Resposta")

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
    }).then(pergunta=>{ // pegar pergunta
        if (pergunta != undefined){  //ver se ela existe
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id','DESC']] //ORDENAR AS RESPOSTAS
            }).then(respostas =>{
                res.render("pergunta",{ // renderizar a pagina passando a variavel pergunta
                 pergunta: pergunta,
                 respostas: respostas
             });
         });      
        }else{ // não encontrada
            res.redirect("/")
        }

    }); //buscar um dado do banco de dados
}); // rota com parametro

app.post("/responder",(req,res)=>{ //receber dados direto do formulario
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId,
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId); //ir para a pagina do id da pergunta
    });
});
app.listen(8080,()=>{console.log("App rodando!");});
