document.addEventListener('DOMContentLoaded', () => {
    // Verificar el estado de login al cargar la página
    checkLoginStatus(); // Verifica si el usuario está logueado

    // Protege los enlaces que requieren autenticación
    protectLinks(); // Protege los enlaces (e.g. Tú Plata, Ayuda)

    // Lógica para los enlaces desplegables en el menú
    const dropdownLinks = document.querySelectorAll('nav ul li');

    dropdownLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            const dropdown = link.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.display = 'block';
            }
        });

        link.addEventListener('mouseout', () => {
            const dropdown = link.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        });
    });

    // Lógica para el botón de "Iniciar sesión"
    const loginButton = document.getElementById('login-btn');
    loginButton.addEventListener('click', () => {
        // Si el usuario no está logueado, redirigir a la página de login
        const isLoggedIn = localStorage.getItem('userLoggedIn');
        if (isLoggedIn !== 'true') {
            window.location.href = "/login"; // Redirige al login
        }
    });

    // Lógica para el botón de "Cerrar sesión"
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.setItem('userLoggedIn', 'false'); // Eliminar el estado de login
            localStorage.removeItem('userName'); // Eliminar el nombre del usuario
            checkLoginStatus(); // Actualizar la vista
        });
    }
});

// Función para verificar si el usuario está logueado
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    const userName = localStorage.getItem('userName');

    const userNameElement = document.getElementById('user-name'); // Asegúrate de que este elemento exista en tu HTML
    if (isLoggedIn === 'true') {
        // Mostrar el nombre del usuario y ocultar el botón de login
        userNameElement.style.display = 'inline';
        userNameElement.textContent = `Bienvenido, ${userName}`;
        document.getElementById('login-btn').style.display = 'none'; // Ocultar el botón de login
        document.getElementById('logout-btn').style.display = 'inline'; // Mostrar el botón de "Cerrar sesión"
    } else {
        // Ocultar el nombre del usuario y mostrar el botón de login
        document.getElementById('login-btn').style.display = 'inline';
        document.getElementById('logout-btn').style.display = 'none';
        userNameElement.style.display = 'none';
    }
}

// Función para proteger los enlaces que requieren login
function protectLinks() {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    
    // Lista de enlaces que deben estar protegidos
    const protectedLinks = ['#link-tu-plata', '#link-ayuda']; 
    protectedLinks.forEach(linkId => {
        const link = document.querySelector(linkId);
        if (link) {
            link.addEventListener('click', (event) => {
                if (isLoggedIn !== 'true') {
                    event.preventDefault(); // Prevenir el acceso
                    alert("Debes iniciar sesión para acceder a esta página.");
                    window.location.href = "/login"; // Redirige al login si no está logueado
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const salirButton = document.querySelector('.boton-salida');

    salirButton.addEventListener('click', () => {
        window.location.href = '/'; // Redirige a la página de inicio (index)
    });
});