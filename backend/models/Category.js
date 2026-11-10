const { DataTypes, Model } = require('sequelize');
class Category extends Model {
  static initModel(sequelize) { return Category.init({ id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }, nombre: { type: DataTypes.STRING(80), allowNull: false, unique: true }, descripcion: { type: DataTypes.STRING(255) } }, { sequelize, modelName: 'Category', tableName: 'categorias', timestamps: false }); }
}
module.exports = Category;
