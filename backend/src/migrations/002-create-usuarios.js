module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.createTable('usuarios', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: Sequelize.STRING(100), allowNull: false },
    correo: { type: Sequelize.STRING(150), allowNull: false, unique: true },
    token: { type: Sequelize.STRING(255), allowNull: false, unique: true },
    rol_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'roles', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    activo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    updated_at: { type: Sequelize.DATE }
  });
  await queryInterface.addIndex('usuarios', ['rol_id']);
  await queryInterface.addIndex('usuarios', ['token']);
  },

  async down(queryInterface) {
  await queryInterface.dropTable('usuarios');
}
};
