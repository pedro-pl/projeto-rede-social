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

function exibirAmigosOn(){
    var contador = 0;

    fetch("/amigos/exibirOn", {
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
            if(json.length > 0){
                if(json.length != contador){
                    amg.innerHTML = ""
                    
                    for(let i = 0; i < json.length; i++){
                        var amigo = JSON.stringify(json[i].nome).replaceAll('"', '');
                        console.log(amigo)

                        amg.innerHTML += `
                            <p><span class="ball"></span>${amigo}</p>
                        `
                    }
                }
                contador = json.length;
            }
          });

        } else {
            throw ("Houve um erro ao tentar trazer os amigos!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    setTimeout(function(){
        exibirAmigosOn()
    }, 10000)
}

function exibirPedidos(){
    var contador = 0;

    fetch("/usuarios/exibirPedidos", {
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
            
            if(json.length > 0){
                if(json.length != contador){
                    ped.innerHTML = ""

                    for(let i = 0; i < json.length; i++){
                        ped.innerHTML += `
                   <div class="nomesPedidos"><p>${json[i].user}</p>
                                <div>
                                    <span class="material-icons iconAccept" onclick="aceitarPedido(${json[i].usuario}, ${json[i].idSolicitacao})">
                                    done
                                    </span>
                                    <span class="material-icons iconDismiss" onclick="negarPedido(${json[i].idSolicitacao})">
                                    close
                                    </span>
                                </div>
                            </div>
                        `
                    }
                }
                contador = json.length
            }
          });

        } else {
            throw ("Houve um erro ao tentar exibir os pedidos!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    setTimeout(function(){
        exibirPedidos()
    }, 10000)
}

function aceitarPedido(user, idPedido){
    fetch("/usuarios/aceitarPedido", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: sessionStorage.ID_USUARIO,
            idUsuarioPedidoServer: user
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            resposta.json().then((json) => {
            /* console.log("Tudo certo, publicações trazidas com sucesso!") */
            console.log(json[0]);
            negarPedido(idPedido)
            exibirAmigosOn()
          });

        } else {
            throw ("Houve um erro ao tentar aceitar o pedido!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function negarPedido(idPedido){
    fetch("/usuarios/negarPedido", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idPedidoServer: idPedido,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            resposta.json().then((json) => {
            /* console.log("Tudo certo, publicações trazidas com sucesso!") */
            console.log(json[0]);
            ped.innerHTML = ""
          });

        } else {
            throw ("Houve um erro ao tentar negar o pedido!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}