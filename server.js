require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/esther_lashes';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✨ Conectado exitosamente a MongoDB en la nube'))
    .catch(err => console.log('Error de conexión:', err));

// ==========================================
// 1. MODELOS DE MONGOOSE
// ==========================================
const ServiceSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true }
});
const Service = mongoose.model('Service', ServiceSchema);

const InventorySchema = new mongoose.Schema({
    nombreItem: { type: String, required: true },
    cantidadStock: { type: Number, required: true },
    unidadMedida: { type: String, required: true },
    precioCompra: { type: Number, required: true }
});
const Inventory = mongoose.model('Inventory', InventorySchema);

const SaleSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    services: [{
        serviceId: String,
        nombreServicio: String,
        precioUnitario: Number
    }],
    metodoPago: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Sale = mongoose.model('Sale', SaleSchema);


// ==========================================
// 2. RUTAS DE LA API (¡SIEMPRE DEBEN IR ANTES DE EXPRESS.STATIC!)
// ==========================================

// --- Servicios ---
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/services', async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/services/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Servicio eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Inventario ---
app.get('/api/inventory', async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/inventory', async (req, res) => {
    try {
        const newItem = new Inventory(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Ventas / Facturación ---
app.get('/api/sales', async (req, res) => {
    try {
        const sales = await Sale.find().sort({ createdAt: -1 });
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sales', async (req, res) => {
    try {
        const newSale = new Sale(req.body);
        await newSale.save();
        res.status(201).json(newSale);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ==========================================
// 3. ARCHIVOS ESTÁTICOS (¡AHORA VA AL FINAL!)
// ==========================================
app.use(express.static('public'));


// ==========================================
// 4. INICIO DEL SERVIDOR
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});