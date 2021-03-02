const Sequelize = require('sequelize');
const connection = require("./database");

const Resposta = connection.define("respostas",{
    corpo: { //salvar resposta
        type: Sequelize.TEXT,
        allowNull:false        // não pode ser vazio
    }, //texto da resposta
    perguntaId: { //salvar o id da resposta
        type: Sequelize.INTEGER,
        allowNull:false
    }
});
Resposta.sync({force:false}); // sincronizar com o banco
module.exports = Resposta;