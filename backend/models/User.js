const { DataTypes, Model } = require('sequelize');
class User extends Model {
  static initModel(sequelize) { return User.init({ id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }, nombre: { type: DataTypes.STRING(100), allowNull: false }, email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } }, password: { type: DataTypes.STRING(255), allowNull: false }, rolId: { type: DataTypes.INTEGER, allowNull: false, field: 'rol_id' } }, { sequelize, modelName: 'User', tableName: 'usuarios', timestamps: true, createdAt: 'creado_en', updatedAt: 'actualizado_en' }); }
}
module.exports = User;
