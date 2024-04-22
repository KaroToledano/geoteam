const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { guardarUsuario } = require('./js/registro'); // Importa la función guardarUsuario desde el archivo GuardarUsuarios.js
const { validarInicioSesion } = require('./js/ingreso');

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`Accediendo a la ruta ${req.url} - ${req.method}`);
  next();
});

mongoose
  .connect(
    'mongodb+srv://joserirvera:MkBDexuiQCf5kVT1@cluster0.imlu12v.mongodb.net/Proyecto'
  )
  .then(() =>
    console.log('Conexión exitosa a la base de datos "stocky1" en MongoDB')
  )
  .catch((err) => console.error('Error de conexión a MongoDB : ', err));

// Configurar middleware para analizar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Configurar middleware para servir archivos estáticos desde la carpeta 'vistas'
app.use(express.static(path.join(__dirname, 'vistas')));

// Configurar middleware para servir archivos estáticos desde la carpeta css
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.static(__dirname));

// Ruta para servir la página principal..................
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/html/interfza.html'));
});

// Ruta para procesar el inicio de sesión
app.post('/login', async (req, res) => {
  const nombre_usuario = req.body.usuario;
  const contraseña = req.body.contrasena;

  if (nombre_usuario === 'admin' && contraseña === 'stocky2024') {
    // Si es el usuario admin, redirigir a otra página y evita validar en la base
    res.redirect('/Usuario_Menu.html');
    return;
  }

  // Validar el inicio de sesión como usuario
  const inicioSesionExitoso = await validarInicioSesion(
    nombre_usuario,
    contraseña
  );

  if (inicioSesionExitoso) {
    // Si es un usuario normal, redirigir a la página de inicio de sesión exitoso
    res.redirect('/html/menu.html');
  } else {
    // Mostrar una alerta de JavaScript en el navegador si el inicio de sesión falla
    const alerta = `
    <script>
      alert('Inicio de sesión fallido. Usuario o contraseña incorrectos.');
      window.location.href = '/html/ingreso.html'; // Redirigir de vuelta a la página de inicio de sesión
    </script>
  `;
    res.send(alerta);
  }
});

// Ruta para guardar un nuevo usuario
app.post('/registro', async (req, res) => {
  const datosUsuario = req.body;
  const resultado = await guardarUsuario(datosUsuario);
  if (resultado) {
    res.redirect('/html/ingreso.html');
  } else {
    res.status(400).send('Error al registrar el usuario');
  }
});

// Ruta para obtener los datos del usuario
// Luego puedes usar la función obtenerDatosUsuario en tus rutas, por ejemplo:
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, { _id: 0, __v: 0 }); // Excluimos _id y __v de la respuesta
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
