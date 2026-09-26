const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    clientName: { type: String, required: true, trim: true },
    services: [
        {
            serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
            nombreServicio: { type: String, required: true },
            precioUnitario: { type: Number, required: true }
        }
    ],
    totalPagado: { type: Number, required: true },
    metodoPago: { type: String, enum: ['Efectivo', 'Transferencia', 'Tarjeta'], default: 'Efectivo' }
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);