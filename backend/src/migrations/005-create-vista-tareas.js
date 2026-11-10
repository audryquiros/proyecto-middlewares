module.exports = {
  async up(queryInterface) {
  await queryInterface.sequelize.query(`
    CREATE VIEW vista_tareas AS
    SELECT
      t.id, t.titulo, t.descripcion, t.prioridad, t.estado,
      t.fecha_vencimiento,
      u.id AS usuario_id, u.nombre AS usuario, u.correo,
      r.nombre AS rol,
      c.id AS categoria_id, c.nombre AS categoria,
      t.created_at, t.updated_at
    FROM tareas t
    INNER JOIN usuarios u ON t.usuario_id = u.id
    INNER JOIN roles r ON u.rol_id = r.id
    LEFT JOIN categorias c ON t.categoria_id = c.id
  `);
  },

  async down(queryInterface) {
  await queryInterface.sequelize.query('DROP VIEW IF EXISTS vista_tareas');
}
};
