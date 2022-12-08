var publicacaoModel = require("../models/publicacaoModel");

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

function trazerPubli(req, res) {
    console.log(`Recuperando oas últimas publicações`);

    publicacaoModel.trazerPubli().then(function (resultado) {
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

function publicar(req, res) {
    var descricao = req.body.descricaoServer;
    var status = req.body.statusServer;
    var usuario = req.body.idUsuarioServer;

    // Faça as validações dos valores
    if (descricao == undefined) {
        res.status(400).send("descricao está undefined!");
    }
        
        publicacaoModel.publicar(descricao, status, usuario)
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
    trazerPubli,
    publicar,
    testar,
}