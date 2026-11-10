# Proyecto Middlewares

Backend REST con Node.js, Express, Sequelize y MySQL.

## Requisitos
- Node.js 20+
- MySQL 8+

## Instalación
1. Crear la base de datos: `CREATE DATABASE proyecto_middlewares;`
2. Copiar `.env.example` a `.env` y colocar las credenciales de MySQL.
3. Ejecutar `npm install`.
4. Ejecutar `npx sequelize-cli db:migrate`.
5. Ejecutar `npx sequelize-cli db:seed:all`.
6. Ejecutar `npm run dev`.

## Login de prueba
- admin@demo.com / 123456
- usuario@demo.com / 123456

## API
- GET `/api/health`
- POST `/api/auth/login`
- GET `/api/tareas`
- GET `/api/tareas/:id`
- POST `/api/tareas`
- PUT `/api/tareas/:id`
- DELETE `/api/tareas/:id`
