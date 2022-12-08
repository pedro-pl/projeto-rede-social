function abrirPopUp(){
    cadastro.style.display = "flex"
    box.style.filter = "blur(2px)"
}

function fecharPopUp(){
    var nome = inputNome.value;
    var email = inputEmail.value;
    var telefone = inputTelefone.value;
    var nascimento = inputDate.value;
    var senha = inputSenha.value;
    var repSenha = inputRepetirSenha.value;

    window.location="index.html"

    cadastro.style.display = "none"
    box.style.filter = "blur(0px)"
}

function validarNome(){
    var nome = inputNome.value;

    if(nome.length < 3 || nome == ""){
        spanNome.innerHTML = "Nome inválido";
        spanNome.style.color = "red"
        return false;
    }else{
        spanNome.innerHTML = "Tudo certo";
        spanNome.style.color = "#80b918"
        return true
    }
}

function validarEmail(){
    var email = inputEmail.value

    if(email.length >= 12 && email.indexOf('@') > -1 && email.indexOf(".com") > -1){
        spanEmail.innerHTML = "Tudo certo"
        spanEmail.style.color = "#80b918"
        return true
    }else{
        spanEmail.innerHTML = "Email inválido"
        spanEmail.style.color = "red"
        return false
    }
}

function validarTelefone(){
    var telefone = inputTelefone.value

    if(telefone.length < 15 ){
        spanTelefone.innerHTML = "Telefone inválido"
        spanTelefone.style.color = "red"
        return false
    }else{
        spanTelefone.innerHTML = "Tudo certo"
        spanTelefone.style.color = "#80b918"
        return true
    }
}

function validarData(){
    var nascimento = inputDate.value
    var valido = nascimento.startsWith("2")
    var valido2 = nascimento.startsWith("1")

    console.log(nascimento.length)

    if(!valido && !valido2){
        spanNascimento.innerHTML = "Data de nascimento inválida"
        spanNascimento.style.color = "red"
        return false
    }else{
        spanNascimento.innerHTML = "Tudo certo"
        spanNascimento.style.color = "#80b918"
        return true
    }
}

function validarSenha(){
    var senha = inputSenha.value;
    var regex = /^(?=(?:.*?[A-Z]){0})(?=(?:.*?[0-9]){0})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}._+^&]*$/;

    if(senha.length >= 8 && regex.exec(senha)){
        spanSenha.innerHTML = "Tudo certo"
        spanSenha.style.color = "#80b918"
        return true
    }else{
        spanSenha.innerHTML = "Senha inválida"
        spanSenha.style.color = "red"
        return false
    }
}

function validarRepSenha(){
    var repSenha = inputRepetirSenha.value
    var senha = inputSenha.value;

    if(repSenha != senha){
        spanRepetirSenha.innerHTML = "Senha inválida"
        spanRepetirSenha.style.color = "red"
        return false
    }else{
        spanRepetirSenha.innerHTML = "Tudo certo"
        spanRepetirSenha.style.color = "#80b918"
        return true
    }
} 

function enviar(){
    var nomeVar = inputNome.value;
    var emailVar = inputEmail.value;
    var telefoneVar = inputTelefone.value;
    var nascimentoVar = inputDate.value;
    var senhaVar = inputSenha.value;

    if(validarNome() && validarEmail() && validarTelefone() && validarData() && validarSenha() && validarRepSenha()){
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                telefoneServer: telefoneVar,
                nascimentoServer: nascimentoVar,
                senhaServer: senhaVar, 
            })
        }).then(function (resposta) {
    
            console.log("resposta: ", resposta);
    
            if (resposta.ok) {
        
                Swal.fire({
                    icon: 'success',
                    title: '<span style="font-family: Roboto, sans-serif;"><h3>Cadastro realizado!</h3> <br> Agora é só se logar e aproveitar!</span>',
                    showConfirmButton: false
                })
                setTimeout(function(){
                    window.location = "index.html"
                }, 2000)
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: '<span style="font-family: Roboto, sans-serif;"><h3>Dados Inválidos</h3> <br> Verifique se tudo está digitado corretamente.</span>',
            showConfirmButton: true
        })
    }
}

function entrar(){
    var email = inputEmailLogin.value;
    var senha = inputSenhaLogin.value;

    if(email == "" || senha == ""){
        Swal.fire({
            icon: 'error',
            title: '<span style="font-family: Roboto, sans-serif;"><h3>Dados Inválidos</h3> <br> Verifique se tudo está digitado corretamente.</span>',
            showConfirmButton: true
        })
    }else{
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha,
            }),
        })
            .then(function (resposta) {
                console.log("ESTOU NO THEN DO entrar()!");
    
                if (resposta.ok) {
                    console.log(resposta);
    
                    resposta.json().then((json) => {
                        console.log(json);
                        console.log(JSON.stringify(json) + 'exibindo json stringfy');
                        
                        sessionStorage.ID_USUARIO = json.id;
                        sessionStorage.NOME_USUARIO = json.nome;
                        sessionStorage.EMAIL_USUARIO = json.email;
                        sessionStorage.TELEFONE = json.telefone;
                        Swal.fire({
                            title: `<span style="font-family: Roboto, sans-serif;font-size: 2rem;color: #000">Entrando..`,
                            toast: true,
                            showConfirmButton: false
                        })
                        setTimeout(function () {
                            window.location = "home.html";
                        }, 2000);
                    });
                } else {
                    console.log("Houve um erro ao tentar realizar o login!");
                    
                    Swal.fire({
                        icon: 'error',
                        title: '<span style="font-family: Roboto, sans-serif;"><h3>Dados Inválidos</h3> <br> Verifique se tudo está digitado corretamente.</span>',
                        showConfirmButton: true
                    })
                    resposta.text().then((texto) => {
                        console.error(texto);
                    });
                }
            })
            .catch(function (erro) {
                console.log(erro);
            });
    }
}