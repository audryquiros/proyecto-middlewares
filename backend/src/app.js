const express = require('express');
const cors = require('cors');
const logger = require('../middleware/logger');
const errorHandler = require('../middleware/errorHandler');
const taskRoutes = require('../routes/taskRoutes');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.get('/api/health', (_req, res) => res.json({ ok: true, message: 'API funcionando' }));
app.use('/api/auth', authRoutes);
app.use('/api/tareas', taskRoutes);
app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));
app.use(errorHandler);
module.exports = app;
