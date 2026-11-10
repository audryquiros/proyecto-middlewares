module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.createTable('tareas', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: Sequelize.STRING(150), allowNull: false },
    descripcion: { type: Sequelize.TEXT },
    prioridad: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'media' },
    estado: { type: Sequelize.STRING(30), allowNull: false, defaultValue: 'pendiente' },
    usuario_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'usuarios', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    categoria_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'categorias', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    fecha_vencimiento: { type: Sequelize.DATEONLY },
    created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    updated_at: { type: Sequelize.DATE }
  });
  for (const field of ['usuario_id', 'categoria_id', 'estado', 'prioridad']) {
    await queryInterface.addIndex('tareas', [field]);
  }
  },

  async down(queryInterface) {
  await queryInterface.dropTable('tareas');
}
};
