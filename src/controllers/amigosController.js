/* var votoModel = require("../models/votoModel"); */
var amigosModel = require("../models/amigosModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA votoController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function exibirOn(req, res) {
    var usuario = req.body.idUsuarioServer
    console.log(`Recuperando os últimos amigos online`);

    amigosModel.exibirOn(usuario).then(function (resultado) {
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
    exibirOn,
    votar,
    testar,
}