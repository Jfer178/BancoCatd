const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});
btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.sign-in .button');
    
    // Manejo del evento para iniciar sesión
    loginButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevenir la acción por defecto del formulario

        // Obtener los valores del formulario
        const phone = document.querySelector('.sign-in input[type="tel"]').value;
        const idCard = document.querySelector('.sign-in input[type="text"]').value;
        const password = document.querySelector('.sign-in input[type="password"]').value;

        // Validación simple de los datos de inicio de sesión
        if (phone === "1234567890" && idCard === "123456789" && password === "1234") {
            // Si los datos son correctos, guardamos el estado de logueo
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userName', 'Juan Pérez'); // Aquí se coloca el nombre del usuario

            // Redirigir a la página principal después del login
            window.location.href = "/"; // Redirige a la página principal, puedes cambiarla según corresponda
        } else {
            alert("Datos incorrectos. Por favor verifica tu información.");
        }
    });
});
