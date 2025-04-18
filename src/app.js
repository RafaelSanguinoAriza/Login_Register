const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./utils/db');

// Configuración de variables de entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use('/api/auth', authRoutes);

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});