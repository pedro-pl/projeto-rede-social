var database = require("../database/config")

/* function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} */

function trazerPubli(usuario) {
    var instrucao = `
    SELECT pub.descricao, pub.statusPublicacao as status, time_format(pub.horaPublicacao, '%H:%i') AS horaPublicacao, usu.nome
    FROM publicacao AS pub 
    LEFT JOIN usuario AS usu
    ON pub.fk_usuario = usu.id
    JOIN amigos AS amg
    on amg.fk_amigo = usu.id
    WHERE amg.fk_usuario = ${usuario} || amg.fk_amigo = ${usuario}
    AND pub.statusPublicacao = 'amigos' || pub.statusPublicacao = 'todos'
    GROUP BY pub.id
    ORDER BY pub.id DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
    console.log("Chegamos no model!")
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function publicar(descricao, status, usuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function votar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO publicacao(descricao, statusPublicacao, fk_usuario) VALUES ("${descricao}", "${status}", ${usuario});
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    trazerPubli,
    publicar,
    /* listar, */
};