import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Role from './Role.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  correo: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  token: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  rolId: { type: DataTypes.INTEGER, allowNull: false, field: 'rol_id' },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
  updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
}, {
  tableName: 'usuarios',
  timestamps: false
});

User.belongsTo(Role, { foreignKey: 'rolId', as: 'rol' });
Role.hasMany(User, { foreignKey: 'rolId', as: 'usuarios' });

export default User;
