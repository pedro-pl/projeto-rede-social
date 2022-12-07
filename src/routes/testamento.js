var express = require("express");
var router = express.Router();

var testamentoController = require("../controllers/testamentoController");

router.get("/trazer/", function (req, res) {
    testamentoController.trazer(req, res);
});

//Recebendo os dados do html e direcionando para a função votar de testamentoController.js
router.post("/votar/:idUsuario", function (req, res) {
    testamentoController.votar(req, res);
    console.log("Chegamos na routes")
})

router.post("/autenticar", function (req, res) {
    testamentoController.entrar(req, res);
});

module.exports = router;