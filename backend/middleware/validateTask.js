module.exports = (req, res, next) => {
  const { titulo, descripcion, prioridad, estado, categoriaId } = req.body;
  if (!titulo || titulo.trim().length < 3) return res.status(400).json({ message: 'El título es obligatorio y debe tener al menos 3 caracteres' });
  if (prioridad && !['baja', 'media', 'alta'].includes(prioridad)) return res.status(400).json({ message: 'Prioridad inválida' });
  if (estado && !['pendiente', 'en_progreso', 'completada'].includes(estado)) return res.status(400).json({ message: 'Estado inválido' });
  if (descripcion !== undefined && typeof descripcion !== 'string') return res.status(400).json({ message: 'Descripción inválida' });
  if (categoriaId !== undefined && (!Number.isInteger(Number(categoriaId)) || Number(categoriaId) < 1)) return res.status(400).json({ message: 'Categoría inválida' });
  next();
};
