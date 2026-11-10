import { User, Role } from '../models/index.js';

export async function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  try {
    const user = await User.findOne({
      where: { token, activo: true },
      include: [{ model: Role, as: 'rol', attributes: ['nombre'] }]
    });

    if (!user) return res.status(401).json({ message: 'Token inválido' });

    req.user = {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      rol: user.rol.nombre
    };
    next();
  } catch (error) {
    next(error);
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso restringido a administradores' });
  }
  next();
}
