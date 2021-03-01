const Sequelize = require('sequelize');

const connection = new Sequelize('ProjetoPerguntas','root','58163',{
    host:'localhost',
    dialect: 'mysql'
});

module.exports = connection;
