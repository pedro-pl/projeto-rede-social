var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/mudarStatusOn", function (req, res) {
    usuarioController.mudarStatusOn(req, res);
});

router.post("/mudarStatusOff", function (req, res) {
    usuarioController.mudarStatusOff(req, res);
});

module.exports = router;