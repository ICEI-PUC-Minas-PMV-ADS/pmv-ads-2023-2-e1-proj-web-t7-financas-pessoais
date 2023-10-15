// LOGIN
let usuarios = [
    {
        email: 'usuario1@gmail.com',
        senha: '1'
    },
    {
        email: 'usuario2@gmail.com',
        senha: '2'
    }
]

localStorage.setItem('usuarios', JSON.stringify(usuarios));

function entrar() {
    let email = i_email.value;
    let senha = i_senha.value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioEncontrado = false;    

    usuarios.forEach(usuario => {
        if (usuario.email === email && usuario.senha === senha) {            
            usuarioEncontrado = true;            
            return location.href = "dashboard.html";            
        }
    });   
    
    if (!usuarioEncontrado) {
        alert('Dados inválidos!');
    }
}

btn_login.onclick = entrar;
