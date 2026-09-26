const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.obtenerInventario);
router.post('/', inventoryController.crearItemInventario);
router.put('/:id', inventoryController.actualizarItemInventario);
router.delete('/:id', inventoryController.eliminarItemInventario);

module.exports = router;