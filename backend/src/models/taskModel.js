const { db } = require('../config/database');

const select = `
SELECT t.id,t.titulo,t.descripcion,t.prioridad,t.estado,t.created_at,
       u.id usuario_id,u.nombre usuario,r.nombre rol,
       c.id categoria_id,c.nombre categoria
FROM tareas t
JOIN usuarios u ON u.id=t.usuario_id
JOIN roles r ON r.id=u.rol_id
LEFT JOIN categorias c ON c.id=t.categoria_id
`;

function all() {
  return db.prepare(`${select} ORDER BY t.id`).all();
}
function byId(id) {
  return db.prepare(`${select} WHERE t.id=?`).get(id);
}
function create(data) {
  const result = db.prepare(`
    INSERT INTO tareas(titulo,descripcion,prioridad,estado,usuario_id,categoria_id)
    VALUES (?,?,?,?,?,?)
  `).run(
    data.titulo, data.descripcion || null, data.prioridad || 'media',
    data.estado || 'pendiente', data.usuarioId, data.categoriaId || null
  );
  return byId(result.lastInsertRowid);
}
function remove(id) {
  const task = byId(id);
  if (!task) return null;
  db.prepare('DELETE FROM tareas WHERE id=?').run(id);
  return task;
}
module.exports = { all, byId, create, remove };