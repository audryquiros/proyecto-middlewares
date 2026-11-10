# Base de datos

La base se crea y administra con Sequelize CLI.

Comandos:

```bash
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev
```

El archivo SQLite se genera automáticamente en `backend/database/database.sqlite`.

No se usa SQL manual para crear la estructura: las tablas, relaciones e índices se crean mediante migraciones de Sequelize.
