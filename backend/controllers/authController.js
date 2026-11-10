const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
exports.login = async (req, res, next) => { try { const { email, password } = req.body; const user = await User.findOne({ where: { email } }); if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Credenciales inválidas' }); const token = jwt.sign({ id: user.id, email: user.email, rolId: user.rolId }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '8h' }); res.json({ token, usuario: { id: user.id, nombre: user.nombre, email: user.email, rolId: user.rolId } }); } catch (e) { next(e); } };
