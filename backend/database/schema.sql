CREATE DATABASE IF NOT EXISTS proyecto_middlewares
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE proyecto_middlewares;

-- =====================================================
-- ESTRUCTURA DE LA BASE DE DATOS
-- Compatible con MySQL 8+ y con las migraciones Sequelize
-- =====================================================

DROP TABLE IF EXISTS tareas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_roles_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_usuarios_email (email),
    KEY idx_usuarios_rol_id (rol_id),
    CONSTRAINT fk_usuarios_rol
        FOREIGN KEY (rol_id)
        REFERENCES roles(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE categorias (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL,
    descripcion VARCHAR(255) NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_categorias_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tareas (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NULL,
    prioridad ENUM('baja','media','alta') NOT NULL DEFAULT 'media',
    estado ENUM('pendiente','en_progreso','completada') NOT NULL DEFAULT 'pendiente',
    usuario_id INT NOT NULL,
    categoria_id INT NOT NULL,
    creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_tareas_usuario_id (usuario_id),
    KEY idx_tareas_categoria_id (categoria_id),
    KEY idx_tareas_estado (estado),
    CONSTRAINT fk_tareas_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_tareas_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- DATOS INICIALES
-- =====================================================

INSERT INTO roles (id, nombre) VALUES
    (1, 'Administrador'),
    (2, 'Usuario');

INSERT INTO categorias (id, nombre, descripcion) VALUES
    (1, 'Trabajo', 'Tareas relacionadas con trabajo'),
    (2, 'Estudio', 'Tareas académicas'),
    (3, 'Personal', 'Tareas personales'),
    (4, 'Otros', 'Tareas generales');

-- Las contraseñas reales de usuarios se cargan mediante el seeder de Sequelize.
-- No se insertan contraseñas en texto plano en este archivo.

-- =====================================================
-- RELACIONES
-- =====================================================
-- roles 1 ---- N usuarios
-- usuarios 1 ---- N tareas
-- categorias 1 ---- N tareas
