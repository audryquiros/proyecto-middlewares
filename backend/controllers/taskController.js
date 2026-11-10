const service = require('../services/taskService');
exports.listar = async (_req, res, next) => { try { res.json(await service.listar()); } catch (e) { next(e); } };
exports.obtener = async (req, res, next) => { try { const item = await service.obtener(req.params.id); if (!item) return res.status(404).json({ message: 'Tarea no encontrada' }); res.json(item); } catch (e) { next(e); } };
exports.crear = async (req, res, next) => { try { const item = await service.crear({ ...req.body, usuarioId: req.user.id }); res.status(201).json(item); } catch (e) { next(e); } };
exports.actualizar = async (req, res, next) => { try { const item = await service.actualizar(req.params.id, req.body); if (!item) return res.status(404).json({ message: 'Tarea no encontrada' }); res.json(item); } catch (e) { next(e); } };
exports.eliminar = async (req, res, next) => { try { const ok = await service.eliminar(req.params.id); if (!ok) return res.status(404).json({ message: 'Tarea no encontrada' }); res.status(204).send(); } catch (e) { next(e); } };
