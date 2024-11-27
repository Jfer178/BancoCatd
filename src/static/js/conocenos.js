document.addEventListener('DOMContentLoaded', function () {

    const salirButton = document.querySelector('.boton-salida');
    if (salirButton) {
        console.log("Botón SALIR encontrado");
        salirButton.addEventListener('click', () => {
            console.log("Botón SALIR clickeado");
            window.location.href = '/'; // Redirige a la página de inicio
        });
    } else {
        console.log("Botón SALIR no encontrado");
    }
});