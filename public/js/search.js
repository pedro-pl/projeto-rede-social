document.addEventListener('keypress', function(e){
    if(e.which == 13){
     pesquisarUsuario()
    }
 }, false);

function pesquisarUsuario(){
    var nomeUsuario = inputPesquisa.value
    var ball = "";

    fetch("/usuarios/pesquisar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeUsuarioServer: nomeUsuario,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            Swal.fire({
                title: `<h3  style="font-family: Roboto, sans-serif;">Pesquisando...</h3>`,
                toast: true,
                showConfirmButton: false,
                timer: 800
            })
            resposta.json().then((json) => {

            if(json.length == 0){
                Swal.fire({
                    title: `Nenhum usuário encontrado...`,
                    toast: true,
                    showConfirmButton: false,
                    timer: 1000
                })
            }else{
                if(json[0].statusUsuario == "online"){
                    ball = "42b72a";
                }else if(json[0].statusUsuario == "offline"){
                    ball = "ef233c"
                }

                setTimeout(function(){
                    result.innerHTML = ""
                    if(json.length > 1){
                        for(let i = 0; i < json.length; i++){
                            result.innerHTML += `
                            <div class="usuario">
                                <div class="info">
                                <h2>${json[i].nome}<span class="status" style="background-color: #${ball};"></span></h2>
                                <h3>Email: ${json[i].email}</h3>
                                </div>
                                <button onclick="enviarPedido(${json[i].id})">Enviar pedido de amizade</button>
                            </div>
                            `
                        }
                    }else{
                        result.innerHTML = `
                        <div class="usuario">
                            <div class="info">
                            <h2>${json[0].nome}<span class="status" style="background-color: #${ball};"></span></h2>
                            <h3>Email: ${json[0].email}</h3>
                            </div>
                            <button onclick="enviarPedido(${json[0].id})">Enviar pedido de amizade</button>
                        </div>
                        `
                    }
                    
                }, 1000)
                
            }
          });

        } else {
            throw ("Houve um erro ao tentar trazer o usuário!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    return false
}

function enviarPedido(id){
    var idped = id
    fetch("/usuarios/enviarPedido", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idPedidoServer: idped,
            idUsuarioServer: sessionStorage.ID_USUARIO,
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
    
            Swal.fire({
                icon: 'success',
                title: '<h1 style="font-family: Roboto, sans-serif;">Pedido enviado!</h1>',
                showConfirmButton: false,
                timer: 1000
            })
        } else {
            throw ("Houve um erro ao tentar enviar o pedido!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}