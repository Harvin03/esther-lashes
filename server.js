require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Esto leerá tu base de datos de la nube, o usará la local si no la encuentra
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/esther_lashes';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✨ Conectado exitosamente a MongoDB en la nube'))
    .catch(err => console.log('Error de conexión:', err));

// ... (aquí van tus rutas de services, sales e inventory que ya tienes creadas) ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});