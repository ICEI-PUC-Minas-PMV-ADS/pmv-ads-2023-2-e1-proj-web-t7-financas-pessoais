//Script da tela de lançamentos
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
    'Pets': 'fa-paw'
};

populateCategoryTable(categories);
populateCategorySelect('selectCategories', categories);
populateCategorySelect('categoriesFilter', categories);
populateTable(savedData);

function showLaunchModal(){
    $("#launchModal").modal('show');
}
function showCategoryModal(){
    $("#categoryModal").modal('show');
}

function showNewCategoryModal() {
    document.getElementById('categoryName').value = '';
    document.getElementById('selectedIcon').value = '';
    let iconDropdown = document.getElementById('iconDropdown');
    iconDropdown.innerHTML = '<option value="" disabled selected>Selecione um ícone</option>';    

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
    populateTable(savedData);
}

function getIconForCategory(categoryName) {
    let category = categories.find(category => category.name == categoryName);
    return category ? category.icon : 'fa-bars'; 
}

function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

function populateTable(data) {
    const tableBody = document.querySelector('#launchTable tbody');
    tableBody.innerHTML = '';
        
    data.forEach(item => {
        const row = tableBody.insertRow();

        row.innerHTML = `
            <td>${formatDate(item.launchDate)}</td>
            <td>${item.description}</td>
            <td><i class="fas ${item.icon}"></i> ${item.category}</td>
            <td>${item.isRevenues ? 'Receitas' : 'Despesas'}</td>
            <td class="${item.isRevenues ? 'green-text' : 'red-text'}">R$ ${item.value}</td>
        `;
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

    console.log('Nome da categoria:', categoryName);
    console.log('Ícone selecionado:', selectedIcon);
    
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

    selectElement.innerHTML = '<option value="">Selecione uma categoria</option>';
    for (const category of categories) {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;

        selectElement.appendChild(option);
    }
}



