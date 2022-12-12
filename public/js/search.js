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
                title: `Pesquisando..`,
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
                    if(json.length > 1){
                        for(let i = 0; i < json.length; i++){
                            result.innerHTML += `
                            <div class="usuario" onclick="abrirPerfil()">
                                <div class="info">
                                <h1>${json[i].nome}<span class="status" style="background-color: #${ball};"></span></h1>
                                <h3>Email: ${json[i].email}</h3>
                                </div>
                                <button>Enviar pedido de amizade</button>
                            </div>
                            `
                        }
                    }else{
                        result.innerHTML = `
                        <div class="usuario" onclick="abrirPerfil()">
                            <div class="info">
                            <h1>${json[0].nome}<span class="status" style="background-color: #${ball};"></span></h1>
                            <h3>Email: ${json[0].email}</h3>
                            </div>
                            <button>Enviar pedido de amizade</button>
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