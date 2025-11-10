const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const reservasRoutes = require('./routes/reservasRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de gestión de reservas de hotel. Visita /api/reservas.' });
});

app.use('/api/reservas', reservasRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Recurso no encontrado.' });
});

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(500).json({ mensaje: 'Error interno del servidor.', detalle: err.message });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
