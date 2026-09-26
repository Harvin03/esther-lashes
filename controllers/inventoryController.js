const Inventory = require('../models/Inventory');

// Ver todo el inventario
exports.obtenerInventario = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el inventario' });
    }
};

// Agregar un nuevo producto/insumo
exports.crearItemInventario = async (req, res) => {
    try {
        const nuevoItem = new Inventory(req.body);
        await nuevoItem.save();
        res.status(201).json({ mensaje: 'Insumo agregado al inventario', item: nuevoItem });
    } catch (error) {
        res.status(400).json({ error: 'Error al agregar insumo' });
    }
};

// Actualizar cantidad o precio de un insumo
exports.actualizarItemInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const itemActualizado = await Inventory.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!itemActualizado) return res.status(404).json({ error: 'Insumo no encontrado' });
        res.status(200).json({ mensaje: 'Inventario actualizado', item: itemActualizado });
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el inventario' });
    }
};

// Eliminar insumo
exports.eliminarItemInventario = async (req, res) => {
    try {
        const { id } = req.params;
        await Inventory.findByIdAndDelete(id);
        res.status(200).json({ mensaje: 'Insumo eliminado del inventario' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar insumo' });
    }
};