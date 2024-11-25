document.getElementById('helpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        cedula: document.getElementById('cedula').value,
        descripcion: document.getElementById('descripcion').value
    };

    console.log('Datos del formulario:', formData);
    alert('Formulario enviado con éxito!');
    
    // Aquí puedes agregar código para enviar los datos a un servidor
    // Por ejemplo, usando fetch() para hacer una petición POST a una API
});