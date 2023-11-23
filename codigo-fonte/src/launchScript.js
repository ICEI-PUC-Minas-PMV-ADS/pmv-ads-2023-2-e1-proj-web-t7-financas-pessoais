const categories = JSON.parse(localStorage.getItem('categories')) || [];
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', saveData);
const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
const selectedIconElement = document.getElementById('selectedIcon');
const iconDropdown = document.getElementById('iconDropdown');

const iconsList = {
    'Casa': 'fa-home',
    'Utensílios': 'fa-utensils',
    'Carro': 'fa-car',
    'Livro': 'fa-book',
    'Chave inglesa': 'fa-wrench',
    'Kit de Primeiros Socorros': 'fa-medkit',
    'Avião': 'fa-plane',
    'Coração': 'fa-heart',
    'Dinheiro': 'fa-dollar-sign',
    'Cartão': 'fa-wallet',
    'Pets': 'fa-paw',
    'Moto': 'fa-motorcycle',
    'Cesta de compras': 'fa-basket-shopping',
    'Carrinho de compras': 'fa-cart-shopping',
    'Economias': 'fa-hand-holding-dollar',
    'Presentes': 'fa-gift'
};

populateCategoryTable(categories);
setDefaultDateValues();
populateCategorySelect('selectCategories', categories);
populateCategorySelect('categoriesFilter', categories);
populateTable(savedData);

function clearLaunchModalFields() {
    document.getElementById('value').value = '';
    document.getElementById('selectCategories').value = '';
    document.getElementById('description').value = '';
    document.getElementById('revenues').checked = true;
    document.getElementById('expenses').checked = false;

    let currentDate = new Date();
    let launchDate = document.getElementById('launchDate');
    launchDate.value = currentDate.toISOString().substr(0, 10);
}

function showLaunchModal() {
    clearLaunchModalFields();  
    $("#launchModal").modal('show');
}

function showCategoryModal(){
    $("#categoryModal").modal('show');
}

function clearCategoryModalFields() {
    document.getElementById('categoryName').value = '';
    let icon = document.getElementById('selectedIcon');
    icon.className = '';
    let iconDropdown = document.getElementById('iconDropdown');
    iconDropdown.innerHTML = '<option value="" disabled selected>Selecione um ícone</option>';
}

function showNewCategoryModal() {
    clearCategoryModalFields();
    populateIconDropdown();
    $('#newCategoryModal').modal('show');
}

function saveData() {    
    $("#launchModal").modal('hide');
    const category = document.getElementById('selectCategories').value;
    const icon = getIconForCategory(category);
    const value = document.getElementById('value').value;
    const launchDate = document.getElementById('launchDate').value;
    const description = document.getElementById('description').value;
    const revenues = document.getElementById('revenues').checked;
    const expenses = document.getElementById('expenses').checked;

    if (category == '' || value == '' || launchDate == '' || description == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Preencha todos os dados do lançamento para salvá-lo!',
        }).then(() => {            
            $("#launchModal").modal('show');
        });
    }
    else {
        const data = {
            category,
            icon,
            value,
            launchDate,
            description,
            isRevenues: revenues,
            isExpenses: expenses
        };
        
        let savedData = JSON.parse(localStorage.getItem('savedData')) || [];
        savedData.push(data);
        localStorage.setItem('savedData', JSON.stringify(savedData));
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Lançamento salvo com sucesso!'
        }).then(() => {
            populateTable(savedData);
        });
    }
}

function getIconForCategory(categoryName) {
    let category = categories.find(category => category.name == categoryName);
    return category ? category.icon : 'fa-bars'; 
}

function clearFilters() {
    location.reload();
}

function filterLaunchs() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const category = document.getElementById('categoriesFilter').value;
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

    populateTable(filteredLaunchs);
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

function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const localDate = new Date(date + 'T00:00:00');
    return localDate.toLocaleDateString('pt-BR', options);
}

function populateTable(data) {
    data.sort((a, b) => new Date(b.launchDate) - new Date(a.launchDate));
    const tableBody = document.querySelector('#launchTable tbody');
    tableBody.innerHTML = '';

    if (data.length === 0) {
        const emptyRow = tableBody.insertRow();
        const cell = emptyRow.insertCell(0);
        cell.colSpan = 6;
        cell.textContent = 'Não há lançamentos no período';
    } else {
        data.forEach(item => {
            const formattedValue = formatCurrency(item);
            const row = tableBody.insertRow();

            row.innerHTML = `
                <td>${formatDate(item.launchDate)}</td>
                <td>${item.description}</td>
                <td><i class="fas ${item.icon}"></i> ${item.category}</td>
                <td>${item.isRevenues ? 'Receita' : 'Despesa'}</td>
                <td class="${item.isRevenues ? 'green-text' : 'red-text'} align-right"> ${formattedValue}</td>
                <td class="align-right">
                    <button class="btn" onclick="deleteLaunch(this)"><i class="fas fa-trash-can"></i></button>
                </td>
            `;            
        });
    }
}

function formatCurrency(item) {
    return parseFloat(item.value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

function deleteLaunch(button) {
    const row = button.closest('tr');
    const savedData = JSON.parse(localStorage.getItem('savedData')) || [];

    Swal.fire({
        icon: 'warning',
        title: 'Tem certeza que deseja excluir esse lançamento?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            const rowData = row.querySelectorAll('td');
            const dataToMatch = {
                launchDate: rowData[0].textContent,
                description: rowData[1].textContent,
                category: rowData[2].textContent,
                value: rowData[4].textContent,
            };

            const newData = savedData.filter(item =>
                formatDate(item.launchDate) !== dataToMatch.launchDate &&
                item.description !== dataToMatch.description &&
                item.category !== dataToMatch.category &&
                formatCurrency(item) !== dataToMatch.value
            );

            localStorage.setItem('savedData', JSON.stringify(newData));
            
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Lançamento excluído com sucesso!'
            }).then(() => {
                location.reload();
            });
        }
    });
}

function populateIconDropdown() {
    for (const [iconName, iconValue] of Object.entries(iconsList)) {
        const option = document.createElement('option');
        option.value = iconValue;
        option.innerHTML = `<i class="fas ${iconValue}"></i> ${iconName}`;
        iconDropdown.appendChild(option);
    }
}

function selectIconFromDropdown() {
    const selectedIcon = iconDropdown.value;
    selectedIconElement.className = '';
    selectedIconElement.classList.add('fas', selectedIcon);
}

function saveCategory() {
    const categoryName = document.getElementById('categoryName').value;
    const selectedIcon = iconDropdown.value;
    
    if (!categoryName) {
        alert('Por favor, insira um nome para a categoria.');
        return; 
    }   
        
    categories.push({ name: categoryName, icon: selectedIcon });
    
    localStorage.setItem('categories', JSON.stringify(categories));
    
    $('#newCategoryModal').modal('hide');
    
    populateCategoryTable(categories);
    populateCategorySelect('selectCategories', categories);
    populateCategorySelect('categoriesFilter', categories);
}

function populateCategoryTable(data) {
    const tableBody = document.querySelector('#categoryTableBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = tableBody.insertRow();
        const iconCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        
        iconCell.innerHTML = `<i class="fas ${item.icon}"></i>`;
        nameCell.textContent = item.name;
    });
}

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

