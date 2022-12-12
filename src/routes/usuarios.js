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

router.post("/pesquisar", function (req, res) {
    usuarioController.pesquisar(req, res);
});

router.post("/enviarPedido", function (req, res) {
    usuarioController.enviarPedido(req, res);
});

router.post("/exibirPedidos", function (req, res) {
    usuarioController.exibirPedidos(req, res);
});

router.post("/aceitarPedido", function (req, res) {
    usuarioController.aceitarPedido(req, res);
});

router.post("/negarPedido", function (req, res) {
    usuarioController.negarPedido(req, res);
});

module.exports = router;