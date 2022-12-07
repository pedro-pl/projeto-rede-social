var database = require("../database/config")

/* function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} */

function trazer() {
    var instrucao = `
    select count(us.fk_partes_testamento) as parte_favorita, pt.nome as nome_testamento
    FROM usuario as us
    join partes_testamento as pt
    on us.fk_partes_testamento = pt.id
    group by fk_partes_testamento;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
    console.log("Chegamos no model!")
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function votar(voto, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function votar():", voto);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        update usuario set fk_partes_testamento = ${voto} where id = ${idUsuario};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    trazer,
    votar,
    /* listar, */
};