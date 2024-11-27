document.addEventListener('DOMContentLoaded', function () {

    const salirButton = document.querySelector('.boton-salida');
    if (salirButton) {
        salirButton.addEventListener('click', () => {
            console.log("Botón SALIR clickeado");  // Verifica si este mensaje aparece cuando haces clic
            window.location.href = '/'; // Redirige a la página de inicio
        });
    } else {
        console.log("Botón SALIR no encontrado");  // Verifica si el botón no se encuentra
    }

    let balance = ''; // Saldo inicial en pesos colombianos
    let showBalance = false;

    async function fetchBalance() {
        try {
            const response = await fetch('/get_balance');
            const data = await response.json();

            if (data.success) {
                balance = data.balance; // Aquí tienes el saldo obtenido
                console.log("Saldo obtenido:", balance);
                balanceElement.textContent = showBalance ? `$${balance.toLocaleString()}` : '••••••';
            } else {
                console.log(data.mensaje); // Manejo de errores
            }
        } catch (error) {
            console.error("Error al obtener el saldo:", error);
        }
    }

    // Llamar a la función para obtener el saldo
    fetchBalance();

    // Variable global para almacenar la información de la tarjeta
    let cardInfo = null;
    let showCardInfo = false;

    // Elementos de la tarjeta
    const cardInfoPanel = document.getElementById('cardInfo');
    const cardNumberElement = document.getElementById('cardNumber');
    const expirationDateElement = document.getElementById('expirationDate');
    const securityCodeElement = document.getElementById('securityCode');
    const toggleCardInfoButton = document.getElementById('toggleCardInfo');
    const cardButton = document.getElementById('cardButton');

    // Agregar logs para verificar que los elementos se encuentran
    console.log('cardInfoPanel:', cardInfoPanel);
    console.log('cardNumberElement:', cardNumberElement);
    console.log('expirationDateElement:', expirationDateElement);
    console.log('securityCodeElement:', securityCodeElement);
    console.log('toggleCardInfoButton:', toggleCardInfoButton);
    console.log('cardButton:', cardButton);

    // Función para actualizar la visualización
    function updateCardDisplay() {
        console.log('Actualizando display, showCardInfo:', showCardInfo);
        console.log('CardInfo actual:', cardInfo);

        if (!cardInfo) {
            console.log('No hay información de tarjeta disponible');
            return;
        }

        try {
            if (showCardInfo) {
                // Convertir el número a string y asegurarnos de que tenga el formato correcto
                const cardNumber = String(cardInfo.number); // Convertimos a string
                console.log('Número de tarjeta:', cardNumber);

                // Formatear el número de tarjeta
                const formattedNumber = cardNumber.replace(/(\d{4})/g, '$1 ').trim();
                cardNumberElement.textContent = formattedNumber;

                // Formatear la fecha
                const expDate = new Date(cardInfo.expDate);
                const month = String(expDate.getMonth() + 1).padStart(2, '0');
                const year = String(expDate.getFullYear()).slice(-2);
                expirationDateElement.textContent = `${month}/${year}`;
                
                // Código de seguridad
                securityCodeElement.textContent = String(cardInfo.securityCode);
                toggleCardInfoButton.textContent = 'Ocultar información';
            } else {
                // Mostrar información oculta
                cardNumberElement.textContent = '•••• •••• •••• ••••';
                expirationDateElement.textContent = '••/••';
                securityCodeElement.textContent = '•••';
                toggleCardInfoButton.textContent = 'Mostrar información';
            }
            console.log('Display actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar display:', error);
            // Mostrar mensaje de error al usuario
            alert('Error al mostrar la información de la tarjeta');
        }
    }

    // Función para obtener información de la tarjeta
    async function fetchCardInfo() {
        try {
            console.log('Obteniendo información de la tarjeta...');
            const response = await fetch('/get_card_info');
            const data = await response.json();
            console.log('Datos recibidos:', data);

            if (data.success) {
                cardInfo = {
                    number: String(data.num_tarjeta), // Asegurarnos de que sea string
                    expDate: new Date(data.fecha_expedicion),
                    securityCode: String(data.cog_seguridad) // Asegurarnos de que sea string
                };
                console.log('CardInfo actualizado:', cardInfo);
                updateCardDisplay();
            } else {
                console.error('Error:', data.mensaje);
                alert(data.mensaje || 'No se pudo obtener la información de la tarjeta');
            }
        } catch (error) {
            console.error('Error al obtener información de la tarjeta:', error);
            alert('Error al conectar con el servidor');
        }
    }

    // Event listener para el botón de mostrar/ocultar
    toggleCardInfoButton.addEventListener('click', function() {
        console.log('Botón toggle clickeado');
        showCardInfo = !showCardInfo;
        console.log('Nuevo estado de showCardInfo:', showCardInfo);
        updateCardDisplay();
    });

    // Evento click para mostrar el panel de la tarjeta
    cardButton.addEventListener('click', function () {
        console.log('Card button clickeado');
        if (cardInfoPanel.style.display === 'block') {
            cardInfoPanel.style.display = 'none';
        } else {
            // Ocultar otros paneles
            cardInfoPanel.style.display = 'block';
            movementsPanel.style.display = 'none';
            transactionsPanel.style.display = 'none';
            sidePanel.style.display = 'none';
            
            // Cargar la información de la tarjeta
            fetchCardInfo();
        }
    });

    // Asegurarse de que la información se cargue cuando se muestre el panel
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM Cargado');
        // Inicializar el estado oculto
        cardInfoPanel.style.display = 'none';
        showCardInfo = false;
        updateCardDisplay();
    });

    // Elementos del panel principal
    const balanceElement = document.getElementById('balance');
    const toggleBalanceButton = document.getElementById('toggleBalance');
    const movementsButton = document.getElementById('movementsButton');
    const servicesButton = document.getElementById('servicesButton');
    const transactionsButton = document.getElementById('transactionsButton');
    const helpButton = document.getElementById('helpButton');

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

    // Función para mostrar/ocultar el panel de movimientos
    movementsButton.addEventListener('click', function () {
        if (movementsPanel.style.display === 'block') {
            movementsPanel.style.display = 'none'; // Ocultar si ya está visible
        } else {
            cardInfoPanel.style.display = 'none';
            movementsPanel.style.display = 'block';
            transactionsPanel.style.display = 'none';
            sidePanel.style.display = 'none';
    
            // Hacer la solicitud para obtener los movimientos
            fetch('/api/get_movements')
                .then(response => response.json())
                .then(data => {
                    movementsList.innerHTML = ''; // Limpiar la lista
    
                    if (data.success) {
                        // Mostrar los movimientos
                        data.movements.forEach(movement => {
                            const li = document.createElement('li');
                            li.textContent = `${movement.fecha} - ${movement.descripcion}: $${Math.abs(movement.monto).toLocaleString()} ${movement.monto > 0 ? '(+)' : '(-)'}`;
                            movementsList.appendChild(li);
                        });
                    } else {
                        alert(data.mensaje); // Mostrar mensaje de error si no se obtuvieron movimientos
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al obtener los movimientos. Intenta nuevamente.');
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

    document.getElementById('sendMoneyFormElement').addEventListener('submit', function (e) {
        e.preventDefault();

        const amount = document.getElementById('sendAmount').value;
        const phone = document.getElementById('sendPhone').value.trim();
        const message = document.getElementById('sendMessage').value;

        // Validación mejorada para números colombianos
        const phoneRegex = /^[0-9]{6,10}$/; // Acepta números entre 6 y 10 dígitos
        if (!phoneRegex.test(phone)) {
            alert('Por favor, ingresa un número de teléfono válido (entre 6 y 10 dígitos)');
            return;
        }

        const montoNumerico = parseFloat(amount);
        if (isNaN(montoNumerico) || montoNumerico <= 0) {
            alert('Por favor, ingresa un monto válido mayor a 0');
            return;
        }

        const data = {
            amount: montoNumerico,
            phone: phone,
            message: message || ''  // Si no hay mensaje, enviar string vacío
        };

        fetch('/api/send_money', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.mensaje || 'Error en la transacción');
            }
            return data;
        })
        .then(data => {
            alert(data.mensaje);
            this.reset();
            // Actualizar el saldo después de la transacción
            fetchBalance();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    });

    document.getElementById('helpFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const data = {
            descripcion: document.getElementById('description').value,
            telefono: document.getElementById('helpPhone').value
        };

        // Enviar la solicitud al servidor
        fetch('/api/centro-ayuda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Tu solicitud ha sido enviada exitosamente');
                this.reset(); // Limpiar el formulario
                // Opcionalmente, cerrar el panel de ayuda
                document.getElementById('helpForm').style.display = 'none';
            } else {
                alert('Error: ' + data.mensaje);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar la solicitud de ayuda');
        });
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
    cellularButton.addEventListener('click', function () {
        showForm(cellularForm);
    });

    homeButton.addEventListener('click', function () {
        showForm(homeForm);
    });

    othersButton.addEventListener('click', function () {
        showForm(otherForm);
    });

    // Envío de formularios
    document.getElementById('cellularFormElement').addEventListener('submit', function (e) {
        e.preventDefault();
        const amount = document.getElementById('amountCelular').value;
        
        // Mejorar la validación del monto
        const montoNumerico = parseFloat(amount);
        if (isNaN(montoNumerico) || montoNumerico <= 0 || !Number.isInteger(montoNumerico)) {
            alert('Por favor, ingresa un monto válido (debe ser un número entero positivo).');
            return;
        }

        const data = {
            tipo_servicio: 'CELULAR',
            monto: montoNumerico
        };

        fetch('/api/pay_service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.mensaje);
                    this.reset();
                } else {
                    alert(data.mensaje);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al enviar el pago. Intenta nuevamente.');
            });
    });



    document.getElementById('homeFormElement').addEventListener('submit', function (e) {
        e.preventDefault();
        const amount = document.getElementById('homeAmount').value;
        
        // Mejorar la validación del monto
        const montoNumerico = parseFloat(amount);
        if (isNaN(montoNumerico) || montoNumerico <= 0 || !Number.isInteger(montoNumerico)) {
            alert('Por favor, ingresa un monto válido (debe ser un número entero positivo).');
            return;
        }

        const data = {
            tipo_servicio: 'HOGAR',
            monto: montoNumerico
        };

        fetch('/api/pay_service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.mensaje);
                this.reset();
            } else {
                alert(data.mensaje);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar el pago. Intenta nuevamente.');
        });
    });

    document.getElementById('otherFormElement').addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Obtener el monto y asegurarnos de que estamos usando el ID correcto
        const montoInput = document.getElementById('otherAmount') || document.querySelector('[name="monto"]');
        const monto = montoInput.value.trim();
        
        // Convertir y validar el monto
        const montoNumerico = parseInt(monto, 10);
        
        // Validación más estricta
        if (!monto || isNaN(montoNumerico) || montoNumerico <= 0) {
            alert('Por favor, ingresa un monto válido mayor a 0.');
            return;
        }

        // Obtener la razón seleccionada
        const razonSelect = document.getElementById('razonSelect') || document.querySelector('select');
        
        const data = {
            tipo_servicio: 'OTROS',
            monto: montoNumerico,
            razon: razonSelect.value
        };

        console.log('Enviando datos:', data); // Para debugging

        fetch('/api/pay_service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert(data.mensaje);
                this.reset();
            } else {
                alert(data.mensaje || 'Error al procesar el pago');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar el pago. Por favor, intenta nuevamente.');
        });
    });




});
