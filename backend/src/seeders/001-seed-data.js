module.exports = {
  async up(queryInterface, Sequelize) {
  const now = new Date();

  await queryInterface.bulkInsert('roles', [
    { nombre: 'admin', descripcion: 'Usuario con permisos administrativos', activo: true, created_at: now },
    { nombre: 'user', descripcion: 'Usuario estándar del sistema', activo: true, created_at: now }
  ]);

  await queryInterface.bulkInsert('categorias', [
    { nombre: 'Backend', descripcion: 'API, servidor y middlewares', activo: true, created_at: now },
    { nombre: 'Frontend', descripcion: 'Interfaz de usuario', activo: true, created_at: now },
    { nombre: 'Base de datos', descripcion: 'SQLite y persistencia', activo: true, created_at: now },
    { nombre: 'Documentación', descripcion: 'Documentación y evidencias', activo: true, created_at: now }
  ]);

  await queryInterface.bulkInsert('usuarios', [
    { nombre: 'Ana', correo: 'ana@practica.com', token: 'abc123', rol_id: 1, activo: true, created_at: now },
    { nombre: 'Luis', correo: 'luis@practica.com', token: 'xyz789', rol_id: 2, activo: true, created_at: now }
  ]);

  await queryInterface.bulkInsert('tareas', [
    {
      titulo: 'Completar práctica de middlewares',
      descripcion: 'Implementar y probar los middlewares requeridos.',
      prioridad: 'alta', estado: 'en_progreso', usuario_id: 1, categoria_id: 1,
      fecha_vencimiento: '2026-11-15', created_at: now
    },
    {
      titulo: 'Probar autenticación',
      descripcion: 'Comprobar acceso utilizando Bearer Token.',
      prioridad: 'alta', estado: 'pendiente', usuario_id: 2, categoria_id: 1,
      fecha_vencimiento: '2026-11-16', created_at: now
    },
    {
      titulo: 'Validar creación de tareas',
      descripcion: 'Comprobar que no se puedan crear tareas con información inválida.',
      prioridad: 'media', estado: 'pendiente', usuario_id: 1, categoria_id: 1,
      fecha_vencimiento: '2026-11-17', created_at: now
    },
    {
      titulo: 'Construir panel de pruebas',
      descripcion: 'Crear interfaz para ejecutar las pruebas de la API.',
      prioridad: 'media', estado: 'completada', usuario_id: 2, categoria_id: 2,
      fecha_vencimiento: '2026-11-12', created_at: now
    },
    {
      titulo: 'Preparar evidencias',
      descripcion: 'Documentar las pruebas realizadas y sus respuestas.',
      prioridad: 'baja', estado: 'pendiente', usuario_id: 1, categoria_id: 4,
      fecha_vencimiento: '2026-11-20', created_at: now
    }
  ]);
  },

  async down(queryInterface) {
  await queryInterface.bulkDelete('tareas', null, {});
  await queryInterface.bulkDelete('usuarios', null, {});
  await queryInterface.bulkDelete('categorias', null, {});
  await queryInterface.bulkDelete('roles', null, {});
}
};
