const UsuarioLogin = require('../models/usuarios');

// Función para validar el inicio de sesión
async function validarInicioSesion(usuario, contrasena) {
  try {
    // Verificar si el usuario es admin y la contraseña es stocky2024
    if (usuario === 'admin' && contraseña === 'stocky2024') {
      console.log('Inicio de sesión como admin exitoso');
      return true;
    }

    // Si no es admin, buscar en la base de datos si existe un usuario con el usuario y contraseña proporcionados
    console.log('usuario: ', usuario);
    console.log('contrasena: ', contrasena);
    const usuarioEncontrado = await UsuarioLogin.findOne({
      usuario,
      contrasena,
    });
    console.log('usario encontrado: ', usuarioEncontrado);
    if (usuarioEncontrado) {
      console.log('Inicio de sesión exitoso');
      return true;
    } else {
      console.log('Usuario o contraseña incorrectos');
      return false;
    }
  } catch (err) {
    console.error('Error al validar inicio de sesión: ', err.message);
    return false;
  }
}

module.exports = {
  validarInicioSesion,
};
