const categories = JSON.parse(localStorage.getItem('categories')) || [];
const savedData = JSON.parse(localStorage.getItem('savedData')) || [];

populateCategorySelect('selectCategories', categories);
setDefaultDateValues();
populateTable(savedData);

function populateCategorySelect(selectElementId, categories) {
    const selectElement = document.getElementById(selectElementId);

    selectElement.innerHTML = '<option value="">Todas</option>';
    for (const category of categories) {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;

        selectElement.appendChild(option);
    }
}

function setDefaultDateValues() {
    let endDateInput = document.getElementById('endDate');
    let startDateInput = document.getElementById('startDate');

    let currentDate = new Date();
    let startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 45);

    endDateInput.value = currentDate.toISOString().substr(0, 10);
    startDateInput.value = startDate.toISOString().substr(0, 10);
}

function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

function formatCurrency(item) {
    return parseFloat(item.value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

function populateTable(data) {
    data.sort((a, b) => new Date(b.launchDate) - new Date(a.launchDate));
    const tableBody = document.querySelector('#launchTable tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const formattedValue = formatCurrency(item);
        const row = tableBody.insertRow();

        row.innerHTML = `
            <td>${formatDate(item.launchDate)}</td>
            <td>${item.description}</td>
            <td><i class="fas ${item.icon}"></i> ${item.category}</td>
            <td>${item.isRevenues ? 'Receitas' : 'Despesas'}</td>
            <td class="${item.isRevenues ? 'green-text' : 'red-text'}"> ${formattedValue}</td>
        `;
    });
}

async function generateReport() {  
    
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const categoryFilter = document.getElementById('selectCategories').value;

    const categoryData = getCategoryData(startDate, endDate, categoryFilter);

    const reportHeader = `Relatório financeiro - ${formatDate(startDate)} a ${formatDate(endDate)}`;
    document.getElementById('reportHeader').textContent = reportHeader;

    document.querySelector('.reportData').style.display = 'block';
    
    createChart('categoryChart', categoryData.labels, categoryData.data, 'Lançamentos do período', reportHeader);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    generatePDF(reportHeader, categoryData);
}

function getCategoryData(startDate, endDate, categoryFilter) {
    
    const filteredData = savedData.filter(item => {
        const launchDate = new Date(item.launchDate);
        return (
            launchDate >= new Date(startDate) &&
            launchDate <= new Date(endDate) &&
            (categoryFilter === '' || item.category === categoryFilter)
        );
    });

    populateTable(filteredData);
    filteredData.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
    
    const categoryTotals = {};
    let totalValue = 0;

    for (const item of filteredData) {
        if (!categoryTotals[item.category]) {
            categoryTotals[item.category] = 0;
        }
        categoryTotals[item.category] += parseFloat(item.value);
        totalValue += parseFloat(item.value);
    }

    const labels = Object.keys(categoryTotals);
    const data = labels.map(category => categoryTotals[category]);    

    return { labels, data };
}

async function createChart(chartId, labels, data, title, header) {
    const canvas = document.getElementById(chartId);

    const config = {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: header,
                    data,
                    backgroundColor: [
                        'rgb(0, 124, 137)',
                        'rgb(77, 171, 185)',
                        'rgb(25, 56, 119)',
                        'rgb(13, 17, 75)',
                        'rgb(78, 98, 167)',
                        'rgb(247, 88, 29)',
                        'rgb(255, 138, 76)',
                        'rgb(233, 130, 137)',
                        'rgb(246, 189, 195)',
                    ],
                },
            ],
        },        
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: title
                }
            }
        },
    };

    const chart = new Chart(canvas, config);
    
    await new Promise(resolve => {
        const observer = new MutationObserver(() => {
            if (canvas.style.opacity === '1') {
                observer.disconnect();
                resolve();
            }
        });

        observer.observe(canvas, { attributes: true });
    });
}

async function generatePDF(reportHeader) {
    const pdf = new jsPDF();
    
    pdf.setFontSize(13);
    pdf.text(10, 10, reportHeader);
    
    const categoryChartCanvas = document.getElementById('categoryChart');
    const categoryChartImage = await html2canvas(categoryChartCanvas); 
    pdf.addImage(categoryChartImage, 'PNG', 50, 30, 120, 120);
    
    const tableCanvas = await html2canvas(document.getElementById('launchTable'));
    pdf.addImage(tableCanvas, 'PNG', 10, 150, 190, 0);

    pdf.save('Resumo financeiro.pdf');
}

function generateXLS() {    
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const category = document.getElementById('selectCategories').value;
    const launchType = getSelectedLaunchType();

    const allLaunchs = JSON.parse(localStorage.getItem('savedData')) || [];

    const filteredLaunchs = allLaunchs.filter(data => {
        const launchDate = new Date(data.launchDate);
        const isRevenues = data.isRevenues;
        const isExpenses = data.isExpenses;

        const isDateInRange = launchDate >= startDate && launchDate <= endDate;
        const isCategoryMatch = category === '' || data.category === category;

        if (launchType === 'allCategories') {
            return isDateInRange && isCategoryMatch;
        } else if (launchType === 'entries') {
            return isDateInRange && isCategoryMatch && isRevenues;
        } else if (launchType === 'exits') {
            return isDateInRange && isCategoryMatch && isExpenses;
        }
    });

    const data = [];
    const headers = ["Data do lançamento", "Categoria", "Valor", "Tipo"];

    data.push(headers);

    filteredLaunchs.forEach(item => {
        let launchType = item.isRevenues ? "Receitas" : "Despesas";
        let formattedValue = formatCurrency(item);
        const rowData = [
            formatDate(item.launchDate),
            item.category,
            formattedValue,
            launchType
        ];
        data.push(rowData);
    });
    
    const wb = XLSX.utils.book_new();    
    
    const ws = XLSX.utils.aoa_to_sheet(data);    
    
    XLSX.utils.book_append_sheet(wb, ws, "Relatório Financeiro");    
    
    XLSX.writeFile(wb, "Relatório Financeiro.xlsx");
}

function getSelectedLaunchType() {
    let allCategoriesRadio = document.getElementById('allCategories');
    let entriesRadio = document.getElementById('entries');
    let exitsRadio = document.getElementById('exits');

    if (allCategoriesRadio.checked) {
        return 'allCategories';
    } else if (entriesRadio.checked) {
        return 'entries';
    } else if (exitsRadio.checked) {
        return 'exits';
    }
}
