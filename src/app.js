const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const authRoutes = require('./routes/authRoutes');
const arbitroRoutes = require('./routes/arbitroRoutes');
const partidoRoutes = require('./routes/partidoRoutes');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Ruta de salud con ID del contenedor
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    containerId: process.env.HOSTNAME || 'local',
    timestamp: new Date().toISOString()
  });
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/arbitros', arbitroRoutes);
app.use('/api/partidos', partidoRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

module.exports = app;