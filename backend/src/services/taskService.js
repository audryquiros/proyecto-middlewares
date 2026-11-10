import { Op } from 'sequelize';
import { Task, User, Category, Role } from '../models/index.js';

const include = [
  { model: User, as: 'usuario', attributes: ['id', 'nombre', 'correo'], include: [{ model: Role, as: 'rol', attributes: ['nombre'] }] },
  { model: Category, as: 'categoria', attributes: ['id', 'nombre', 'descripcion'] }
];

export async function listTasks(filters = {}) {
  const where = {};
  if (filters.estado) where.estado = filters.estado;
  if (filters.prioridad) where.prioridad = filters.prioridad;
  if (filters.usuarioId) where.usuarioId = Number(filters.usuarioId);
  if (filters.categoriaId) where.categoriaId = Number(filters.categoriaId);

  return Task.findAll({ where, include, order: [['id', 'ASC']] });
}

export async function getTaskById(id) {
  return Task.findByPk(id, { include });
}

export async function createTask(data, userId) {
  return Task.create({
    titulo: data.titulo.trim(),
    descripcion: data.descripcion || null,
    prioridad: data.prioridad || 'media',
    estado: data.estado || 'pendiente',
    usuarioId: data.usuarioId || userId,
    categoriaId: data.categoriaId || null,
    fechaVencimiento: data.fechaVencimiento || null,
    createdAt: new Date()
  });
}

export async function updateTask(id, data) {
  const task = await Task.findByPk(id);
  if (!task) return null;

  const fields = {};
  for (const key of ['titulo', 'descripcion', 'prioridad', 'estado', 'categoriaId', 'fechaVencimiento']) {
    if (data[key] !== undefined) fields[key] = data[key];
  }
  if (fields.titulo) fields.titulo = fields.titulo.trim();
  fields.updatedAt = new Date();

  await task.update(fields);
  return getTaskById(id);
}

export async function deleteTask(id) {
  const task = await Task.findByPk(id);
  if (!task) return null;
  await task.destroy();
  return task;
}
