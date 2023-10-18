// LOGIN
function entrar() {
    let email = i_email.value;
    let senha = i_senha.value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioEncontrado = false;    

    usuarios.forEach(usuario => {
        if (usuario.email === email && usuario.password === senha) {            
            usuarioEncontrado = true;            
            // return location.href = "dashboard.html";            
            return setTimeout(function() {window.location.href = "dashboard.html";}, 1000);            
        }
    });   
    
    if (!usuarioEncontrado) {        
        Swal.fire('Dados inválidos!')
    }    
}

btn_login.onclick = entrar;

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

modal_btn.onclick = cadastrar;