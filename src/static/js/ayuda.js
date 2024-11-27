document.getElementById('helpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        descripcion: document.getElementById('descripcion').value,
        telefono: document.getElementById('telefono').value
    };

    console.log('Datos del formulario:', formData);
    
    // Enviar los datos al servidor
    fetch('/api/centro-ayuda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la inserción');
        }
        return response.json();
    })
    .then(data => {
        alert('Formulario enviado con éxito! ID de inserción: ' + data.id);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario');
    });
});

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