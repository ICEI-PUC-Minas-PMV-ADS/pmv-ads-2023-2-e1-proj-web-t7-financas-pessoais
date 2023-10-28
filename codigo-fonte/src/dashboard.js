// DASHBOARD

//Dados despesas por categorias
function gerarCorAleatoria() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

let testeCategorias = {
    Casa: {
        valor: 40,
        cor: gerarCorAleatoria()
    },
    Carro: {
        valor: 35,
        cor: gerarCorAleatoria()
    },
    Viagem: {
        valor: 25,
        cor: gerarCorAleatoria()
    },
    Faculdade: {
        valor: 20,
        cor: gerarCorAleatoria()
    }
};

localStorage.setItem('categorias', JSON.stringify(testeCategorias));

let categorias = JSON.parse(localStorage.getItem('categorias')) || {};

let chaves = Object.keys(categorias);
let valores = Object.values(categorias).map(categoria => categoria.valor);
let cores = Object.values(categorias).map(categoria => categoria.cor);

// Gráfico
const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: chaves,
        datasets: [{            
            data: valores,
            backgroundColor: cores,
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
                        size: 18
                    }
                }
            }
        }
    }
});

//Nome usuário ativo
let welcome = document.getElementById("i_welcome");

let usuarioAtivo = JSON.parse(localStorage.getItem('usuarioAtivo')) || [];

welcome.textContent = "Bem-vindo, " + usuarioAtivo.name + "!";

//Dados dashboard
let teste = {
    saldo: 21750,
    receita: 10500,
    despesa: 6846
};

localStorage.setItem('dashboard', JSON.stringify(teste));

let dadosDashboard = JSON.parse(localStorage.getItem('dashboard')) || {};

let dashSaldo = document.getElementById("i_saldo");
let dashReceita = document.getElementById("i_receita");
let dashDespesa = document.getElementById("i_despesa");

let storageSaldo = dadosDashboard.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
let storageReceita = dadosDashboard.receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
let storageDespesa = dadosDashboard.despesa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

dashSaldo.textContent = storageSaldo;
dashReceita.textContent = storageReceita;
dashDespesa.textContent = storageDespesa;

//Balanço mensal
let calcTotal = dadosDashboard.saldo;
let calcReceita = dadosDashboard.receita;
let calcDespesa = dadosDashboard.despesa;

let bmReceita = document.getElementById("bm_receita");
let bmDespesa = document.getElementById("bm_despesa");
let bmBalanco = document.getElementById("bm_balanco");

bmBalanco.textContent = (calcReceita - calcDespesa).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

if((calcReceita - calcDespesa) < 0) {
    let elemento = document.getElementsByClassName("text-primary")[1];
    elemento.classList.remove("text-primary");
    elemento.classList.add("text-danger");
}

bmReceita.textContent = storageReceita;
bmDespesa.textContent = storageDespesa;

let PorcentagemDespesa = Math.round(calcDespesa / calcReceita * 100) + "%";

let progressBars = document.getElementsByClassName('progress-bar');

progressBars[1].style.width = PorcentagemDespesa;
progressBars[1].textContent = PorcentagemDespesa;