// Variables para manejar el estado
let balanceVisible = false;
let transactionsExpanded = false;

// Obtener elementos del DOM
const balanceButton = document.getElementById('toggleBalance');
const transactionsDiv = document.getElementById('transactions');
const toggleTransactionsButton = document.getElementById('toggleTransactions');
const mainContainer = document.querySelector('.container');

// Balance inicial
const balance = 1000000; // Balance inicial en pesos colombianos

// Alternar visibilidad del balance
balanceButton.addEventListener('click', () => {
    balanceVisible = !balanceVisible;
    balanceButton.textContent = balanceVisible ? `$${balance.toLocaleString()}` : '••••••';
});

// Alternar visibilidad de transacciones y tamaño del contenedor
toggleTransactionsButton.addEventListener('click', () => {
    transactionsExpanded = !transactionsExpanded;

    // Mostrar/ocultar los botones de transacciones
    transactionsDiv.classList.toggle('hidden');

    // Cambiar tamaño del contenedor dinámicamente
    if (transactionsExpanded) {
        mainContainer.classList.add('expanded');
    } else {
        mainContainer.classList.remove('expanded');
    }
});