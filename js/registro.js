const Usuario = require('../models/usuarios');

// Función para guardar un nuevo usuario
async function guardarUsuario(datosUsuario) {
  const nuevoUsuario = new Usuario({
    nombre: datosUsuario.nombre,
    usuario: datosUsuario.usuario,
    contrasena: datosUsuario.contrasena,
    anio_nacimiento: datosUsuario.anio_nacimiento,
  });

  try {
    await nuevoUsuario.save();
    console.log('Usuario registrado correctamente');
    return true;
  } catch (err) {
    console.error('Error al registrar el usuario: ', err.message);
    return false;
  }
}

module.exports = {
  guardarUsuario,
};
