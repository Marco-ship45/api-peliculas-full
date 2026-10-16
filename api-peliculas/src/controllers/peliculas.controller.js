const mongoose = require('mongoose');
const Pelicula = require('../models/Pelicula');

// Valida que el :id tenga formato de ObjectId de MongoDB
const idValido = (id) => mongoose.Types.ObjectId.isValid(id);
const responderIdInvalido = (res) =>
  res.status(400).json({ ok: false, mensaje: 'El id proporcionado no es válido' });

// Convierte los errores de validación de Mongoose en un mensaje legible
const mensajeDeError = (error) => {
  if (error.name === 'ValidationError') {
    return Object.values(error.errors).map((e) => e.message).join('. ');
  }
  return error.message;
};

// GET /api/peliculas
const obtenerPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.status(200).json({ ok: true, data: peliculas });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener las películas' });
  }
};

// GET /api/peliculas/:id
const obtenerPeliculaPorId = async (req, res) => {
  if (!idValido(req.params.id)) return responderIdInvalido(res);
  try {
    const pelicula = await Pelicula.findById(req.params.id);
    if (!pelicula) {
      return res.status(404).json({ ok: false, mensaje: 'Película no encontrada' });
    }
    res.status(200).json({ ok: true, data: pelicula });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener la película' });
  }
};

// POST /api/peliculas
const crearPelicula = async (req, res) => {
  try {
    const nuevaPelicula = new Pelicula(req.body);
    const peliculaGuardada = await nuevaPelicula.save();
    res.status(201).json({ ok: true, data: peliculaGuardada });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: mensajeDeError(error) });
  }
};

// PUT /api/peliculas/:id
const actualizarPelicula = async (req, res) => {
  if (!idValido(req.params.id)) return responderIdInvalido(res);
  try {
    const peliculaActualizada = await Pelicula.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );
    if (!peliculaActualizada) {
      return res.status(404).json({ ok: false, mensaje: 'Película no encontrada' });
    }
    res.status(200).json({ ok: true, data: peliculaActualizada });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: mensajeDeError(error) });
  }
};

// DELETE /api/peliculas/:id
const eliminarPelicula = async (req, res) => {
  if (!idValido(req.params.id)) return responderIdInvalido(res);
  try {
    const peliculaEliminada = await Pelicula.findByIdAndDelete(req.params.id);
    if (!peliculaEliminada) {
      return res.status(404).json({ ok: false, mensaje: 'Película no encontrada' });
    }
    res.status(200).json({ ok: true, data: peliculaEliminada });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar la película' });
  }
};

module.exports = {
  obtenerPeliculas,
  obtenerPeliculaPorId,
  crearPelicula,
  actualizarPelicula,
  eliminarPelicula,
};