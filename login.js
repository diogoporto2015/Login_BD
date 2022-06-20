const mysql = require('mysql');
const express = require('express');
const bodyParser = require("body-parser")
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));
app.use("/img",express.static("img"));

const connection = mysql.createConnection({
    host: "192.168.1.66",
    user: "diogoporto",
    password: "d@172709",
    database: "cadastro"
});

//conectar ao banco de dados
connection.connect(function(error){
    if (error) throw error
    else console.log("Conectado ao banco de dados com Sucesso!")

});


app.get ("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", encoder, (req, res) => {
    var nome = req.body.nome;
    var senha = req.body.senha;

    connection.query("select * from usuarios where nome = ? and senha = ?", [nome, senha], (error, results, fields) => {
        if(results.length > 0){
            res.redirect("/welcome");
        }else {
            res.redirect("/");
        }
        res.end();
    })
})

app.get("/welcome", function (req, res){
    res.sendFile(__dirname + "/welcome.html");
})

app.listen(8080);
console.log("Servidor Rodando e Funcionando! localhost:8080");