const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Rutas para los servicios de Esther Lashes
router.get('/', serviceController.obtenerServicios);
router.post('/', serviceController.crearServicio);
router.put('/:id', serviceController.actualizarServicio);
router.delete('/:id', serviceController.eliminarServicio);

module.exports = router;