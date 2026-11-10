# Práctica de Middlewares — Sistema completo

## BD
La base de datos SQLite tiene cuatro tablas relacionadas:

- roles
- usuarios
- categorias
- tareas

Relaciones:
`roles 1:N usuarios`
`usuarios 1:N tareas`
`categorias 1:N tareas`

Esto mantiene la práctica enfocada en middlewares, pero hace que la persistencia tenga sentido como sistema real.

## Ejecutar

Backend:
```bash
cd backend
npm install
npm start
```

Frontend, en otra terminal:
```bash
cd frontend
npm install
npm run dev
```

Usuarios de prueba:
- Ana — `abc123` — admin
- Luis — `xyz789` — user
