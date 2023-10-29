
function carregarMenu(menuUrl) {
  const menuContainer = document.getElementById("menu-container");

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

function verificarTamanhoDaTela() {
  const larguraDaJanela = window.innerWidth;

  if (larguraDaJanela <= 900) {
    carregarMenu('menuMobile.html');
  } else {
    carregarMenu('menu.html');
  }
}

window.addEventListener('resize', verificarTamanhoDaTela);

verificarTamanhoDaTela();

document.addEventListener('DOMContentLoaded', function () {
  new bootstrap.Dropdown(document.querySelector('.menu-mobile-container .navbar-toggler'));
});
