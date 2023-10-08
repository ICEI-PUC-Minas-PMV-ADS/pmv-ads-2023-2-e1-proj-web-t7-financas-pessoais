function carregarMenu() {
    const menuContainer = document.getElementById('menu-container');
    const menuUrl = 'menu.html';

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                menuContainer.innerHTML = xhr.responseText;
            } else {
                console.error('Erro ao carregar o menu.');
            }
        }
    };
    xhr.open('GET', menuUrl, true);
    xhr.send();
}

carregarMenu();


//funções da tela de relatórios