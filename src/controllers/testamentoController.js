/* var votoModel = require("../models/votoModel"); */
var testamentoModel = require("../models/testamentoModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA votoController");
    res.json("ESTAMOS FUNCIONANDO!");
}

/* function trazer(req, res) {
    votoModel.trazer()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
} */

function trazer(req, res) {
    const limite_linhas = 7;

    console.log(`Recuperando os últimos ${limite_linhas} votos`);

    testamentoModel.trazer(limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
    }

function votar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var voto = req.body.votoServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (voto == undefined) {
        res.status(400).send("voto está undefined!");
    }
        
        // Passe os valores como parâmetro e vá para o arquivo votoModel.js
        testamentoModel.votar(voto, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o envio! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

module.exports = {
    trazer,
    votar,
    testar,
}