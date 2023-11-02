// LOGIN
function entrar() {
    let email = document.getElementById('email').value;
    let senha = document.getElementById('password').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioEncontrado = false;

    usuarios.forEach(usuario => {
        if (usuario.email === email && usuario.password === senha) {
            usuarioEncontrado = true;

            if (email !== '' && senha !== '') {
                let usuarioAtivo = {
                    name: usuario.name,
                    email: usuario.email,
                    password: usuario.password
                }

                localStorage.setItem('usuarioAtivo', JSON.stringify(usuarioAtivo));

                return setTimeout(function () {
                    location.href = "dashboard.html";
                }, 1000);
            }
        }
    });

        if (email === '' || senha === '') {
            Swal.fire({
                title: 'Erro!',
                text: 'Preencha todos os dados!',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }

        if (!usuarioEncontrado && email !== '' && senha !== '') {
            Swal.fire({
                title: 'Erro!',
                text: 'Verifique os dados de login!',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }

    // if (!usuarioEncontrado && email !== '' && senha !== '') {
    //     Swal.fire('Dados inválidos!');
    // }
}

function togglePasswordVisibility(element) {
    const passwordField = element.previousElementSibling;
    if (passwordField.type === "password") {
        passwordField.type = "text";
        element.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordField.type = "password";
        element.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Cadastro
function cadastrar() {
    let nameModal = modal_name.value;
    let emailModal = modal_email.value;
    let passwordModal = modal_password.value;
    
    let cadastro = JSON.parse(localStorage.getItem('usuarios')) || [];

    cadastro.push({
        name: nameModal,
        email: emailModal,
        password: passwordModal
    });

    localStorage.setItem('usuarios', JSON.stringify(cadastro));
}

function abrirModalCadastro() {
    document.getElementById('modal_email').value = '';
    document.getElementById('modal_password').value = '';
    
    var cadastroModal = new bootstrap.Modal(document.getElementById('cadastroModal'));
    cadastroModal.show();
}

document.getElementById('cadastrar-link').addEventListener('click', abrirModalCadastro);

function abrirModalRedefinirSenha() {
    document.getElementById('esqueci_email').value = '';
    document.getElementById('nova_senha').value = '';
    $("#esqueciSenhaModal").modal('show');   
}

document.getElementById('esqueci-senha-link').addEventListener('click', abrirModalRedefinirSenha);

// Redefinir a senha do usuário
function redefinirSenha() {
    debugger;
    $("#esqueciSenhaModal").modal('hide');

    let esqueciEmail = document.getElementById('esqueci_email').value;
    let novaSenha = document.getElementById('nova_senha').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === esqueciEmail) {            
            usuarios[i].password = novaSenha;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));            
            return;
        }
    }
    
    Swal.fire('E-mail não encontrado. Por favor, verifique o e-mail inserido.');
}

