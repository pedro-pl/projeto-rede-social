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
    select count(us.fk_parte_favorita) as parte_favorita, pb.parte as nome_livro
    FROM usuario as us 
    join partes_biblicas as pb
    on us.fk_parte_favorita = pb.id
    group by fk_parte_favorita;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
    console.log("Chegamos no model!")
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function votar(parte, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function votar():", parte);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        update usuario set fk_parte_favorita = ${parte} where id = ${idUsuario};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    trazer,
    votar,
    /* listar, */
};