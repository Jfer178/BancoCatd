document.addEventListener('DOMContentLoaded', function () {
    const balance = 1000000; // Saldo inicial en pesos colombianos
    let showBalance = false;
    let showCardInfo = false;

    // Elementos del panel principal
    const balanceElement = document.getElementById('balance');
    const toggleBalanceButton = document.getElementById('toggleBalance');
    const cardButton = document.getElementById('cardButton');
    const movementsButton = document.getElementById('movementsButton');
    const servicesButton = document.getElementById('servicesButton');
    const transactionsButton = document.getElementById('transactionsButton');
    const helpButton = document.getElementById('helpButton');

    // Elementos de la información de la tarjeta
    const cardInfoPanel = document.getElementById('cardInfo');
    const cardNumberElement = document.getElementById('cardNumber');
    const expirationDateElement = document.getElementById('expirationDate');
    const securityCodeElement = document.getElementById('securityCode');
    const toggleCardInfoButton = document.getElementById('toggleCardInfo');

    // Elementos de los movimientos
    const movementsPanel = document.getElementById('movements');
    const movementsList = document.getElementById('movementsList');

    // Elementos de las transacciones
    const transactionsPanel = document.getElementById('transactionsPanel');
    const sendMoneyButton = document.getElementById('sendMoneyButton');
    const withdrawButton = document.getElementById('withdrawButton');
    const qrCodeButton = document.getElementById('qrCodeButton');
    const rechargeButton = document.getElementById('rechargeButton');

    // Elementos del panel lateral (side panel)
    const sidePanel = document.getElementById('sidePanel');
    const servicesPanel = document.getElementById('servicesPanel');
    const sendMoneyForm = document.getElementById('sendMoneyForm');
    const withdrawCodePanel = document.getElementById('withdrawCodePanel');
    const rechargeLocations = document.getElementById('rechargeLocations');
    const helpForm = document.getElementById('helpForm');

    // Elementos de los formularios
    const cellularButton = document.getElementById('cellularButton');
    const homeButton = document.getElementById('homeButton');
    const othersButton = document.getElementById('othersButton');

    // Elementos de los formularios de cada tipo
    const cellularForm = document.getElementById('cellularForm');
    const homeForm = document.getElementById('homeForm');
    const otherForm = document.getElementById('otherForm');

    // Función para alternar la visibilidad del saldo
    toggleBalanceButton.addEventListener('click', function () {
        showBalance = !showBalance;
        balanceElement.textContent = showBalance ? `$${balance.toLocaleString()}` : '••••••';
        toggleBalanceButton.textContent = showBalance ? 'Ocultar saldo' : 'Mostrar saldo';
    });

    // Función para alternar la visibilidad de la información de la tarjeta
    cardButton.addEventListener('click', function () {
        if (cardInfoPanel.style.display === 'block') {
            cardInfoPanel.style.display = 'none'; // Ocultar si ya está visible
        } else {
            cardInfoPanel.style.display = 'block'; // Mostrar si no está visible
            movementsPanel.style.display = 'none';
            transactionsPanel.style.display = 'none';
            sidePanel.style.display = 'none';
        }
    });

    // Función para alternar la visibilidad de la información de la tarjeta adicional
    toggleCardInfoButton.addEventListener('click', function () {
        showCardInfo = !showCardInfo;
        cardNumberElement.textContent = showCardInfo ? '1234 5678 9012 3456' : '•••• •••• •••• ••••';
        expirationDateElement.textContent = showCardInfo ? '12/25' : '••/••';
        securityCodeElement.textContent = showCardInfo ? '123' : '•••';
        toggleCardInfoButton.textContent = showCardInfo ? 'Ocultar información' : 'Mostrar información';
    });

    // Función para mostrar/ocultar el panel de movimientos
    movementsButton.addEventListener('click', function () {
        if (movementsPanel.style.display === 'block') {
            movementsPanel.style.display = 'none'; // Ocultar si ya está visible
        } else {
            cardInfoPanel.style.display = 'none';
            movementsPanel.style.display = 'block';
            transactionsPanel.style.display = 'none';
            sidePanel.style.display = 'none';

            // Generar movimientos de ejemplo
            const movements = [
                { date: '2023-05-01', description: 'Depósito', amount: 500000 },
                { date: '2023-05-03', description: 'Compra en tienda', amount: -50000 },
                { date: '2023-05-05', description: 'Transferencia recibida', amount: 200000 },
                { date: '2023-05-07', description: 'Pago de servicio', amount: -80000 },
                { date: '2023-05-10', description: 'Retiro en cajero', amount: -100000 }
            ];

            movementsList.innerHTML = '';
            movements.forEach(movement => {
                const li = document.createElement('li');
                li.textContent = `${movement.date} - ${movement.description}: $${Math.abs(movement.amount).toLocaleString()} ${movement.amount > 0 ? '(+)' : '(-)'}`;
                movementsList.appendChild(li);
            });
        }
    });

    // Función para mostrar/ocultar el panel de servicios
    servicesButton.addEventListener('click', function () {
        if (servicesPanel.style.display === 'block') {
            servicesPanel.style.display = 'none'; // Ocultar si ya está visible
        } else {
            sidePanel.style.display = 'block';
            servicesPanel.style.display = 'block';
            sendMoneyForm.style.display = 'none';
            withdrawCodePanel.style.display = 'none';
            rechargeLocations.style.display = 'none';
            helpForm.style.display = 'none';
        }
    });

    // Función para mostrar/ocultar el panel de transacciones
    transactionsButton.addEventListener('click', function () {
        if (transactionsPanel.style.display === 'block') {
            transactionsPanel.style.display = 'none'; // Ocultar si ya está visible
        } else {
            cardInfoPanel.style.display = 'none';
            movementsPanel.style.display = 'none';
            transactionsPanel.style.display = 'block';
            sidePanel.style.display = 'none';
        }
    });

    sendMoneyButton.addEventListener('click', function () {
        sidePanel.style.display = 'block';
        servicesPanel.style.display = 'none';
        sendMoneyForm.style.display = 'block';
        withdrawCodePanel.style.display = 'none';
        rechargeLocations.style.display = 'none';
        helpForm.style.display = 'none';
    });

    withdrawButton.addEventListener('click', function () {
        sidePanel.style.display = 'block';
        servicesPanel.style.display = 'none';
        sendMoneyForm.style.display = 'none';
        withdrawCodePanel.style.display = 'block';
        rechargeLocations.style.display = 'none';
        helpForm.style.display = 'none';

        // Generar un código de retiro aleatorio de 6 dígitos
        const withdrawCode = Math.floor(100000 + Math.random() * 900000);
        document.getElementById('withdrawCode').textContent = withdrawCode;
    });

    rechargeButton.addEventListener('click', function () {
        sidePanel.style.display = 'block';
        servicesPanel.style.display = 'none';
        sendMoneyForm.style.display = 'none';
        withdrawCodePanel.style.display = 'none';
        rechargeLocations.style.display = 'block';
        helpForm.style.display = 'none';

        // Generar ubicaciones de recarga de ejemplo
        const locations = [
            'Calle 123 # 45-67',
            'Carrera 89 # 01-23',
            'Avenida Principal # 45-67'
        ];

        const locationsList = document.getElementById('locationsList');
        locationsList.innerHTML = '';
        locations.forEach(location => {
            const li = document.createElement('li');
            li.textContent = location;
            locationsList.appendChild(li);
        });
    });

    helpButton.addEventListener('click', function () {
        // Verificar si el panel de ayuda ya está visible
        if (helpForm.style.display === 'block') {
            // Si está visible, ocultarlo
            helpForm.style.display = 'none';
        } else {
            // Si no está visible, mostrarlo y ocultar otros paneles
            sidePanel.style.display = 'block';
            servicesPanel.style.display = 'none';
            sendMoneyForm.style.display = 'none';
            withdrawCodePanel.style.display = 'none';
            rechargeLocations.style.display = 'none';
            helpForm.style.display = 'block';
        }
    });

    // Envío de formularios
    document.getElementById('sendMoneyFormElement').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Dinero enviado exitosamente');
        this.reset();
    });

    document.getElementById('helpFormElement').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Formulario de ayuda enviado exitosamente');
        this.reset();
    });

    function showForm(formToShow) {
        // Ocultar todos los formularios
        cellularForm.style.display = 'none';
        homeForm.style.display = 'none';
        otherForm.style.display = 'none';
    
        // Mostrar el formulario seleccionado
        formToShow.style.display = 'block';
    }
    
    // Funciones para manejar cada botón
    cellularButton.addEventListener('click', function() {
        showForm(cellularForm);
    });
    
    homeButton.addEventListener('click', function() {
        showForm(homeForm);
    });
    
    othersButton.addEventListener('click', function() {
        showForm(otherForm);
    });
    
    // Envío de formularios
    document.getElementById('cellularFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pago para celular enviado exitosamente');
        this.reset();
    });
    
    document.getElementById('homeFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pago para hogar enviado exitosamente');
        this.reset();
    });
    
    document.getElementById('otherFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pago para otros enviado exitosamente');
        this.reset();
    });


});
