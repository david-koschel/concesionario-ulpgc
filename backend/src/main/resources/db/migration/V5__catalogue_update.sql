-- Eliminar la tabla si existe
DROP TABLE IF EXISTS catalogue;

-- Crear la tabla de nuevo
CREATE TABLE catalogue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image TEXT
);