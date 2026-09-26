const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    categoria: { type: String, required: true }, // Ej: Pestañas, Cejas, Micropigmentación
    precio: { type: Number, required: true, min: 0 },
    descripcion: { type: String, trim: true },
    activo: { type: Boolean, default: true } // Para ocultar servicios sin borrarlos
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);