function cerrarPagina() {
    var confirmar = confirm("¿Estás seguro que deseas finalizar?");
    if (confirmar) {
        window.close();
    } else {
        alert("Para cerrar la ventana, por favor utiliza la combinación de teclas Ctrl + W en tu teclado.");
        setTimeout(function() {
            window.close();
        }, 5000);
    }
}