var express = require("express");
var router = express.Router();

var publicacaoController = require("../controllers/publicacaoController");

router.post("/trazerPubli/", function (req, res) {
    publicacaoController.trazerPubli(req, res);
});

//Recebendo os dados do html e direcionando para a função votar de votoController.js
router.post("/publicar/", function (req, res) {
    publicacaoController.publicar(req, res);
})

module.exports = router;