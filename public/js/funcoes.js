function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "index.html";
}

function mudarStatusOff(){
    fetch("/usuarios/mudarStatusOff", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: sessionStorage.ID_USUARIO,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            resposta.json().then((json) => {
            /* console.log("Tudo certo, publicações trazidas com sucesso!") */
            console.log(json[0]);
            /* console.log(JSON.stringify(json.descricao)); */
            console.log("tudo certo!")
          });

        } else {
            throw ("Houve um erro ao tentar trazer os amigos!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    
    limparSessao();
}