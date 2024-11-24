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

// Botón de iniciar sesión
const loginButton = document.getElementById('login-btn');
loginButton.addEventListener('click', () => {
    window.location.href = "Templates/Login.html";  // Aquí se redirige a la página de login
});