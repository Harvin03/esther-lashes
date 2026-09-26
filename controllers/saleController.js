const Sale = require('../models/Sale');

// Registrar una nueva venta / factura
exports.crearVenta = async (req, res) => {
    try {
        const { clientName, services, metodoPago } = req.body;
        
        // Calcular total automáticamente
        let totalPagado = 0;
        services.forEach(s => {
            totalPagado += s.precioUnitario;
        });

        const nuevaVenta = new Sale({
            clientName,
            services,
            totalPagado,
            metodoPago
        });

        await nuevaVenta.save();
        res.status(201).json({ mensaje: '¡Factura generada con éxito!', venta: nuevaVenta });
    } catch (error) {
        res.status(400).json({ error: 'Error al procesar la venta' });
    }
};

// Historial de ventas
exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Sale.find().sort({ createdAt: -1 }); // Las más recientes primero
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el historial de ventas' });
    }
};