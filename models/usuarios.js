const mongoose = require('mongoose');

// Definir el esquema y modelo para la colección de usuarios
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  usuario: String,
  contrasena: String,
  anio_nacimiento: String,
});

const Usuario = mongoose.model('registro', usuarioSchema);

module.exports = Usuario;
