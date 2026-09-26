const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    nombreItem: { type: String, required: true, trim: true },
    cantidadStock: { type: Number, required: true, min: 0, default: 0 },
    unidadMedida: { type: String, required: true }, // Ej: unidades, ml, cajas
    precioCompra: { type: Number, required: true, min: 0 },
    stockMinimo: { type: Number, default: 5 } // Para alertas de stock bajo
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);