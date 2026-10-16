const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
    },
    genero: {
      type: String,
      required: [true, 'El género es obligatorio'],
    },
    anio: {
      type: Number,
      required: [true, 'El año es obligatorio'],
    },
    director: {
      type: String,
      required: [true, 'El director es obligatorio'],
    },
    calificacion: {
      type: Number,
      min: [0, 'La calificación mínima es 0'],
      max: [10, 'La calificación máxima es 10'],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pelicula', peliculaSchema);