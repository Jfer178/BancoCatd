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
    // Manejo del evento para iniciar sesión
    const loginButton = document.querySelector('.sign-in .button');
    
    loginButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevenir la acción por defecto del formulario

        const phone = document.querySelector('.sign-in input[name="telefono"]').value;
        const idCard = document.querySelector('.sign-in input[name="cedula"]').value;
        const password = document.querySelector('.sign-in input[name="contraseña"]').value;

        // Enviar datos al servidor mediante fetch (AJAX)
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                telefono: phone,
                cedula: idCard,
                contraseña: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userName', data.userName);
                window.location.href = '/'; // Redirigir a la página principal
            } else {
                alert("Datos incorrectos. Por favor verifica tu información.");
            }
        })
        .catch(error => {
            console.error("Error en el login: ", error);
            alert("Hubo un problema con el login.");
        });
    });

    // Manejo del registro
    const registerButton = document.querySelector('.sign-up .button');

    registerButton.addEventListener('click', (event) => {
        event.preventDefault();
    
        const nombre = document.querySelector('.sign-up input[name="nombre"]').value;
        const cedula = document.querySelector('.sign-up input[name="cedula"]').value;
        const telefono = document.querySelector('.sign-up input[name="telefono"]').value;
        const direccion = document.querySelector('.sign-up input[name="direccion"]').value;
        const fechaNacimiento = document.querySelector('.sign-up input[name="fecha_nacimiento"]').value;
        const fechaExpedicion = document.querySelector('.sign-up input[name="fecha_expedicion"]').value;
        const contrasena = document.querySelector('.sign-up input[name="contraseña"]').value;
        const correo = document.querySelector('.sign-up input[name="correo"]').value;   



        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                cedula: cedula,
                telefono: telefono,
                direccion: direccion,
                fecha_nacimiento: fechaNacimiento,
                fecha_expedicion: fechaExpedicion,
                contraseña: contrasena,
                correo: correo
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registro exitoso, puedes iniciar sesión ahora.");
                window.location.href = '/login'; // Redirigir a la página de login
            } else {
                alert("Hubo un problema al registrarse.");
            }
        })
        .catch(error => {
            console.error("Error en el registro: ", error);
            alert("Hubo un problema con el registro.");
        });
    });
});


