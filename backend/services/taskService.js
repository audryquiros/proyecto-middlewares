const { Task, User, Category } = require('../models');
async function listar() { return Task.findAll({ include: [{ model: User, as: 'usuario', attributes: ['id','nombre','email'] }, { model: Category, as: 'categoria', attributes: ['id','nombre'] }], order: [['id','DESC']] }); }
async function crear(data) { return Task.create(data); }
async function obtener(id) { return Task.findByPk(id, { include: [{ model: User, as: 'usuario' }, { model: Category, as: 'categoria' }] }); }
async function actualizar(id, data) { const task = await Task.findByPk(id); if (!task) return null; await task.update(data); return task; }
async function eliminar(id) { const task = await Task.findByPk(id); if (!task) return false; await task.destroy(); return true; }
module.exports = { listar, crear, obtener, actualizar, eliminar };
