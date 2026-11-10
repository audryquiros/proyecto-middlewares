import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';
import Category from './Category.js';

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING(150), allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  prioridad: {
    type: DataTypes.ENUM('baja', 'media', 'alta'),
    allowNull: false,
    defaultValue: 'media'
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'en_progreso', 'completada', 'cancelada'),
    allowNull: false,
    defaultValue: 'pendiente'
  },
  usuarioId: { type: DataTypes.INTEGER, allowNull: false, field: 'usuario_id' },
  categoriaId: { type: DataTypes.INTEGER, field: 'categoria_id' },
  fechaVencimiento: { type: DataTypes.DATEONLY, field: 'fecha_vencimiento' },
  createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
  updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
}, {
  tableName: 'tareas',
  timestamps: false
});

Task.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });
Task.belongsTo(Category, { foreignKey: 'categoriaId', as: 'categoria' });
User.hasMany(Task, { foreignKey: 'usuarioId', as: 'tareas' });
Category.hasMany(Task, { foreignKey: 'categoriaId', as: 'tareas' });

export default Task;
