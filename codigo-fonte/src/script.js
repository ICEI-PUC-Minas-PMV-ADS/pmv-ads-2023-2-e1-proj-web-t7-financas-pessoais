function carregarMenu() {
  const menuContainer = document.getElementById("menu-container");
  const menuUrl = "menu.html";

  fetch(menuUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar o menu.");
      }
      return response.text();
    })
    .then((menuHtml) => {
      menuContainer.innerHTML = menuHtml;

      let userName = document.getElementById("userName");
      let usuarioAtivo = JSON.parse(localStorage.getItem('usuarioAtivo')) || [];
      userName.textContent = usuarioAtivo.name;
    })
    .catch((error) => {
      console.error("Erro ao carregar o menu:", error);
    });
}

carregarMenu();

function verificarTamanhoDaTela() {
    
    let larguraDaJanela = window.innerWidth;
    
    if (larguraDaJanela <= 900) { 
        carregarMenu('menuMobile.html');        
    } else {
        carregarMenu();        
    } 
}

window.addEventListener('resize', verificarTamanhoDaTela);

verificarTamanhoDaTela();