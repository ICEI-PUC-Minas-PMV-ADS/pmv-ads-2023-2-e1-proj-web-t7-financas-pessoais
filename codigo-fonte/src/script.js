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
    })
    .catch((error) => {
      console.error("Erro ao carregar o menu:", error);
    });
}

carregarMenu();

// Função para verificar o tamanho da tela e adicionar a nav mobile
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