const Sequelize = require('sequelize');
const connection = require("./database");

// estrutura do banco de dados - tabela

const Pergunta = connection.define('Perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull:false
    }
    });
Pergunta.sync({force: false}).then(()=>{
console.log("tabela criada")}); // não vai forçar a criação da tabela, se ela ja existir

module.exports = Pergunta;