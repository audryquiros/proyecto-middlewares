const { DataTypes, Model } = require('sequelize');
class Role extends Model {
  static initModel(sequelize) { return Role.init({ id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }, nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true } }, { sequelize, modelName: 'Role', tableName: 'roles', timestamps: false }); }
}
module.exports = Role;
