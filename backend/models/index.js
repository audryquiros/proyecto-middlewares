const sequelize = require('../config/database');
const Role = require('./Role');
const User = require('./User');
const Category = require('./Category');
const Task = require('./Task');

Role.initModel(sequelize);
User.initModel(sequelize);
Category.initModel(sequelize);
Task.initModel(sequelize);

Role.hasMany(User, { foreignKey: 'rolId', as: 'usuarios' });
User.belongsTo(Role, { foreignKey: 'rolId', as: 'rol' });
User.hasMany(Task, { foreignKey: 'usuarioId', as: 'tareas' });
Task.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });
Category.hasMany(Task, { foreignKey: 'categoriaId', as: 'tareas' });
Task.belongsTo(Category, { foreignKey: 'categoriaId', as: 'categoria' });

module.exports = { sequelize, Role, User, Category, Task };
