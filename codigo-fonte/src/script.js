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
