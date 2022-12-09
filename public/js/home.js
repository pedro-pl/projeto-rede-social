var option;
var ctd = 0;

document.getElementById("fd").addEventListener("wheel", myFunction);

function myFunction() {
    opt.style.display = "none"
    slct.style.borderRadius = "5px";
    ctd = 0;
}

function select(){
    ctd++;

    if(ctd > 1){
        opt.style.display = "none"
        slct.style.borderRadius = "5px";
        ctd = 0;
    }else{
        opt.style.display = "flex"
        slct.style.borderRadius = "5px 5px 0 0";
    }
}

function selecionar(){
        if(document.getElementById('opt1').checked){
            setTimeout(function(){
                option = opt1.value
                document.getElementById("btn").disabled = false;
                btn.style.backgroundColor = "#42b72a"
            }, 100)
        }else if(document.getElementById('opt2').checked){
            setTimeout(function(){
                option = opt2.value
                document.getElementById("btn").disabled = false;
                btn.style.backgroundColor = "#42b72a"
            }, 100)
        }else if(document.getElementById('opt3').checked){
            setTimeout(function(){
                option = opt3.value
                document.getElementById("btn").disabled = false;
                btn.style.backgroundColor = "#42b72a"
            }, 100)
        }
}

function postar(){
    var descricao = inputPublicacao.value;
    slct.style.boxShadow= "0px 0px 0px 0px"
    opt.style.display = "none"

    console.log(descricao)

    fetch("/publicacao/publicar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descricaoServer: descricao,
            idUsuarioServer: sessionStorage.ID_USUARIO,
            statusServer: option,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
    
            Swal.fire({
                icon: 'success',
                title: '<h3 style="font-family: Roboto, sans-serif;">Post realizado!</h3>',
                showConfirmButton: false
            })
            setTimeout(function(){
                window.location = "home.html"
            }, 1000)
        } else {
            throw ("Houve um erro ao tentar realizar o post!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function trazerPubli(){
    publi.innerHTML = ""
    fetch("/publicacao/trazerPubli", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            resposta.json().then((json) => {
            /* console.log("Tudo certo, publicações trazidas com sucesso!") */
            console.log(json[0]);
            /* console.log(JSON.stringify(json.descricao)); */
            for(let i = 0; i < json.length; i++){
                var usuario = JSON.stringify(json[i].nome).replaceAll('"', '');
                var publicacaoFormatada = JSON.stringify(json[i].descricao).replaceAll('"', '');
                var horaPubli = JSON.stringify(json[i].horaPublicacao).replaceAll('"', '');
                publi.innerHTML += `
                <div class="post">
                <h2 class="autorPost">${usuario}</h2><span style="font-size: .9rem; font-weight: 0;">
                Publicado as ${horaPubli}</span>
                <br>
                <br>
                <p style="margin: 0; font-size: 1.4rem;">${publicacaoFormatada}</p>
                </div>`
            }
          });

        } else {
            throw ("Houve um erro ao tentar trazer os post!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
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

function mudarStatusOn(){
    fetch("/usuarios/mudarStatusOn", {
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
            throw ("Houve um erro ao tentar mudar o status!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function botaoDisabled(){
    document.getElementById("btn").disabled = true;
}