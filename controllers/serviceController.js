const Service = require('../models/Service');

// 1. Ver todos los servicios
exports.obtenerServicios = async (req, res) => {
    try {
        const servicios = await Service.find({ activo: true });
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};

// 2. Agregar un nuevo servicio
exports.crearServicio = async (req, res) => {
    try {
        const nuevoServicio = new Service(req.body);
        await nuevoServicio.save();
        res.status(201).json({ mensaje: 'Servicio agregado con éxito', servicio: nuevoServicio });
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el servicio. Revisa los datos.' });
    }
};

// 3. Editar nombre, precio o categoría de un servicio existente
exports.actualizarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const servicioActualizado = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        
        if (!servicioActualizado) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        
        res.status(200).json({ mensaje: 'Servicio actualizado correctamente', servicio: servicioActualizado });
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el servicio' });
    }
};

// 4. Eliminar o desactivar un servicio
exports.eliminarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        await Service.findByIdAndUpdate(id, { activo: false }); // Desactivación lógica
        res.status(200).json({ mensaje: 'Servicio eliminado del catálogo' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
};