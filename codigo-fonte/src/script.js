function carregarMenu() {
    const menuContainer = document.getElementById('menu-container');
    const menuUrl = 'menu.html';

    fetch(menuUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o menu.');
            }
            return response.text();
        })
        .then(menuHtml => {
            menuContainer.innerHTML = menuHtml;
        })
        .catch(error => {
            console.error('Erro ao carregar o menu:', error);
        });
}

carregarMenu();

// DASHBOARD
const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Casa', 'Carro', 'Viagem', 'Faculdade'],
        datasets: [{
            label: 'My First Dataset',
            data: [40, 35, 25, 20],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(745, 115, 56)',
            ],
            hoverOffset: 4
        }]
    },
    options: {
        layout: {
            padding: {
                bottom: 140,
                top: 0
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'right', 
                labels: {
                    font: {
                        size: 20
                    }
                }
            }
        }
    }
});

