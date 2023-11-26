//Dados despesas por categorias
let dataLaunch = JSON.parse(localStorage.getItem('savedData')) || [];

let despesaMensal = 0;
let receitaMensal = 0;
let saldo = 0;
let balanco = 0;
let totalDespesa = 0;
let totalReceita = 0;
const somaPorCategoria = {};
const dataAtual = new Date();
const mesAtual = dataAtual.getMonth() + 1;
let anoAtual = new Date().getFullYear(); 

// Calendário
// Mês
let months = [
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" }
];

let selectMonth = document.getElementById("month");
let filterSelectMonth = localStorage.getItem('selectMonth') || null;

months.forEach(month => {
    let optionMonth = document.createElement("option");
    optionMonth.value = month.value;
    optionMonth.text = month.label;    
    if(!filterSelectMonth && month.value == mesAtual) {
        optionMonth.selected = true;
    }
    if(filterSelectMonth == month.value) {
        optionMonth.selected = true;
    }
    selectMonth.appendChild(optionMonth);
});

// Ano
let ultimosCincoAnos = [];
for (let i = 0; i < 5; i++) {
    ultimosCincoAnos[i] = anoAtual - i;    
}
let selectYear = document.getElementById("year");
let filterSelectYear = localStorage.getItem('selectYear') || null;

ultimosCincoAnos.forEach(ano => {
    let optionYear = document.createElement("option");
    optionYear.value = ano;
    optionYear.text = ano;
    if(!filterSelectYear && ano == anoAtual) {
        optionYear.selected = true;
    }
    if(filterSelectYear == ano) {
        optionYear.selected = true;
    }
    selectYear.appendChild(optionYear);
});

// DASHBOARD
dataLaunch.forEach(element => {
    const launchDate = new Date(element.launchDate);
    const launchMonth = launchDate.getMonth() + 1;
    const launchYear = launchDate.getFullYear();
    
    // Despesa Mensal
    if (element.isExpenses && launchMonth == selectMonth.value && launchYear == selectYear.value) {        
        despesaMensal += parseFloat(element.value); 

        // Categorias    
        const category = element.category;
        const value = element.value;
        somaPorCategoria[category] = (somaPorCategoria[category] || 0) + parseFloat(element.value);
    }

    // Receita Mensal
    if (element.isRevenues && launchMonth == selectMonth.value && launchYear == selectYear.value) {
        receitaMensal += parseFloat(element.value);        
    }
    
    // Total despesa e receita
    if (element.isExpenses && launchYear < selectYear.value) {
        totalDespesa += parseFloat(element.value);        
    }
    if (element.isExpenses && launchYear == selectYear.value && launchMonth <= selectMonth.value) {
        totalDespesa += parseFloat(element.value);        
    }
    if (element.isRevenues && launchYear < selectYear.value) {
        totalReceita += parseFloat(element.value);
    }
    if (element.isRevenues && launchYear == selectYear.value && launchMonth <= selectMonth.value) {
        totalReceita += parseFloat(element.value);
    }       
});

// Saldo
saldo = totalReceita - totalDespesa; 

// Balanço
balanco = receitaMensal - despesaMensal;

// Gráfico
let chaves = Object.keys(somaPorCategoria);
let valores = Object.values(somaPorCategoria);
if(chaves.length === 0) {
    chaves = ['Categoria']
}
if(valores.length === 0) {
    valores = [100]
}

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: chaves,
        datasets: [{            
            data: valores,            
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
let dashSaldo = document.getElementById("i_saldo");
let dashReceita = document.getElementById("i_receita");
let dashDespesa = document.getElementById("i_despesa");

let storageSaldo = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
let storageReceita = receitaMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
let storageDespesa = despesaMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

dashSaldo.textContent = storageSaldo;
dashReceita.textContent = storageReceita;
dashDespesa.textContent = storageDespesa;

//Balanço mensal
let bmReceita = document.getElementById("bm_receita");
let bmDespesa = document.getElementById("bm_despesa");
let bmBalanco = document.getElementById("bm_balanco");

bmBalanco.textContent = (balanco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

if((receitaMensal - despesaMensal) < 0) {
    let elemento = document.getElementsByClassName("text-primary")[1];
    elemento.classList.remove("text-primary");
    elemento.classList.add("text-danger");
}

bmReceita.textContent = storageReceita;
bmDespesa.textContent = storageDespesa;

let PorcentagemDespesa = Math.round(despesaMensal / receitaMensal * 100);
if (receitaMensal === 0){
    PorcentagemDespesa = 100;
}
PorcentagemDespesa = isNaN(PorcentagemDespesa) ? "0%" : PorcentagemDespesa + " %";

let progressBars = document.getElementsByClassName('progress-bar');

progressBars[1].style.width = PorcentagemDespesa;
progressBars[1].textContent = PorcentagemDespesa;

//Filtro Mês e Ano
function filterDashboard() {
    localStorage.setItem('selectMonth', selectMonth.value);
    localStorage.setItem('selectYear', selectYear.value);
    location.reload()
}

selectMonth.addEventListener("change", filterDashboard);
selectYear.addEventListener("change", filterDashboard);
