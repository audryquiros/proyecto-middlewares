const { DataTypes, Model } = require('sequelize');
class Task extends Model {
  static initModel(sequelize) { return Task.init({ id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }, titulo: { type: DataTypes.STRING(150), allowNull: false }, descripcion: { type: DataTypes.TEXT }, prioridad: { type: DataTypes.ENUM('baja','media','alta'), allowNull: false, defaultValue: 'media' }, estado: { type: DataTypes.ENUM('pendiente','en_progreso','completada'), allowNull: false, defaultValue: 'pendiente' }, usuarioId: { type: DataTypes.INTEGER, allowNull: false, field: 'usuario_id' }, categoriaId: { type: DataTypes.INTEGER, allowNull: false, field: 'categoria_id' } }, { sequelize, modelName: 'Task', tableName: 'tareas', timestamps: true, createdAt: 'creado_en', updatedAt: 'actualizado_en' }); }
}
module.exports = Task;
