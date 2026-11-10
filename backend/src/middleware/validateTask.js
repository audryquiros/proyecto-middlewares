export default function validateTask(req, res, next) {
  const { titulo, prioridad, estado, categoriaId, fechaVencimiento } = req.body;

  if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
    return res.status(400).json({ message: 'El título es obligatorio' });
  }

  if (prioridad && !['baja', 'media', 'alta'].includes(prioridad)) {
    return res.status(400).json({ message: 'Prioridad inválida' });
  }

  if (estado && !['pendiente', 'en_progreso', 'completada', 'cancelada'].includes(estado)) {
    return res.status(400).json({ message: 'Estado inválido' });
  }

  if (categoriaId !== undefined && categoriaId !== null && (!Number.isInteger(Number(categoriaId)) || Number(categoriaId) < 1)) {
    return res.status(400).json({ message: 'categoriaId inválido' });
  }

  if (fechaVencimiento && !/^\d{4}-\d{2}-\d{2}$/.test(fechaVencimiento)) {
    return res.status(400).json({ message: 'fechaVencimiento debe tener formato YYYY-MM-DD' });
  }

  next();
}
