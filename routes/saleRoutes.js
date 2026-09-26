const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Rutas para las facturas / ventas
router.get('/', saleController.obtenerVentas);
router.post('/', saleController.crearVenta);

module.exports = router;