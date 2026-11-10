import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import taskRoutes from './routes/taskRoutes.js';
import { sequelize } from './config/database.js';
import './models/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/api/health', async (req, res, next) => {
  try {
    await sequelize.authenticate();
    res.json({ ok: true, database: 'SQLite + Sequelize' });
  } catch (error) { next(error); }
});

app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada mediante Sequelize.');
    app.listen(PORT, () => console.log(`API ejecutándose en http://localhost:${PORT}`));
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') start();

export default app;
