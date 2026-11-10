import * as service from '../services/taskService.js';

export async function getTasks(req, res, next) {
  try {
    res.json(await service.listTasks(req.query));
  } catch (error) { next(error); }
}

export async function getTask(req, res, next) {
  try {
    const task = await service.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) { next(error); }
}

export async function createTask(req, res, next) {
  try {
    const task = await service.createTask(req.body, req.user.id);
    res.status(201).json(task);
  } catch (error) { next(error); }
}

export async function updateTask(req, res, next) {
  try {
    const task = await service.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) { next(error); }
}

export async function deleteTask(req, res, next) {
  try {
    const task = await service.deleteTask(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada correctamente', task });
  } catch (error) { next(error); }
}
