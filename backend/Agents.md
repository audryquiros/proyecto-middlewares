# Agents.md

## Reglas del proyecto

- Backend con Node.js + Express.
- Persistencia con SQLite.
- ORM obligatorio: Sequelize.
- La base de datos debe crearse mediante migraciones de Sequelize.
- Los datos iniciales se cargan mediante seeders.
- Mantener separación por capas: config, models, controllers, routes, services y middleware.
- Las validaciones de entrada deben permanecer en middleware.
- Las rutas no deben contener lógica de negocio.
- Usar asociaciones de Sequelize para relaciones entre modelos.
- Mantener el frontend y backend separados.
