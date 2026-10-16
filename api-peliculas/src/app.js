const express = require('express');
const cors = require('cors');
const peliculasRoutes = require('./routes/peliculas.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/peliculas', peliculasRoutes);

app.get('/', (req, res) => {
  res.send('API de Películas funcionando');
});

// Rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

// Errores no controlados (por ejemplo, JSON mal formado en el body)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, mensaje: 'El body no es un JSON válido' });
  }
  console.error(err);
  res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
});

module.exports = app;