module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.createTable('categorias', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: Sequelize.STRING(60), allowNull: false, unique: true },
    descripcion: { type: Sequelize.STRING(200) },
    activo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
  });
  },

  async down(queryInterface) {
  await queryInterface.dropTable('categorias');
}
};
