var option;

function select(){
    slct.style.boxShadow= "0 3px 6px #00000029, 0 1px 2px #0000003b"
    opt.style.display = "flex"
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
                <h2 style="margin: 0">${usuario}</h2><span style="font-size: .9rem; font-weight: 0;">
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

function botaoDisabled(){
    document.getElementById("btn").disabled = true;
}