📘 Aplicación Full Stack – Angular 19 + Spring Boot 3 + JWT

Base de datos utilizada: MySQL

Este proyecto Full Stack implementa autenticación JWT, autorización por roles, CRUD de productos y un frontend moderno con Angular Material.
Fue desarrollado como parte de una prueba técnica con tiempo limitado de 4 horas, priorizando funcionalidad completa, claridad y buenas prácticas.

⚠️ Nota sobre la elección de base de datos

El proyecto podía implementarse con SQL Server o MySQL, ambos contemplados como opciones válidas.

Sin embargo, para optimizar el tiempo de desarrollo dentro de la ventana disponible (4 horas) y garantizar una entrega completamente funcional, se eligió MySQL, ya que:

Ya estaba instalado y configurado en el entorno local

Permitía avanzar inmediatamente sin invertir tiempo adicional en instalaciones

Se evitó la descarga, instalación y configuración de SQL Server (que puede tardar entre 1 y 2 horas)

👉 La elección fue estratégica para garantizar el cumplimiento del tiempo y entregar un proyecto funcional y completo.

🏗️ Arquitectura General

Frontend (Angular 19)
        |
        |  HTTP + JWT
        v
Backend (Spring Boot 3)
        |
        |  JDBC
        v
Base de Datos (MySQL)


🔐 Autenticación (JWT)

El proyecto utiliza:

Spring Security

JWT para autenticación y autorización

BCrypt para contraseñas

Filtro JWT personalizado

Rol ADMIN

Flujo:

Angular envía email + password

Spring Boot valida y genera JWT

Angular guarda el token

Cada request envía:
Authorization: Bearer <token>

El filtro JWT autoriza o rechaza

📂 Estructura del Proyecto
/backend
/frontend
/sql/database.sql

Backend (Spring Boot)
com.fullstack.backend
 ├── controller
 ├── service
 ├── security
 ├── repository
 ├── entity
 └── dto

Frontend (Angular 19)
src/app
 ├── auth
 ├── products
 ├── core
 └── shared

⚙️ Requerimientos
Backend

Java 17

Maven 3.8+

MySQL 8

Frontend

Node.js 18

Angular CLI 19

🛠️ Configuración Backend (MySQL)
Crear la base de datos
CREATE DATABASE fullstack;

Configurar application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/fullstack?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

🚀 Ejecutar Backend
mvn spring-boot:run


👉 http://localhost:8080

🧪 Usuario Inicial
email: admin@mail.com
password: admin123
rol: ADMIN

📘 Endpoints Backend
🔑 POST /auth/login

Body:

{
  "email": "admin@mail.com",
  "password": "admin123"
}

📦 CRUD Productos
Método	Endpoint	Rol
GET	/api/productos	Token
GET	/api/productos/{id}	Token
POST	/api/productos	ADMIN
PUT	/api/productos/{id}	ADMIN
DELETE	/api/productos/{id}	ADMIN
🧭 Frontend – Angular 19
Instalación
cd frontend
npm install

Ejecutar
ng serve -o


👉 http://localhost:4200

🔐 Configuración Angular

src/environments/environment.ts

export const environment = {
  apiUrl: 'http://localhost:8080'
};

🎨 Funcionalidades del Frontend

✔ Login
✔ Guard de autenticación
✔ Interceptor JWT
✔ CRUD productos
✔ Angular Material
✔ Validaciones reactivas
✔ Diálogos de confirmación
✔ Sidenav y UI limpia

📂 Script SQL

sql/database.sql

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    rol VARCHAR(20) NOT NULL
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    tipo VARCHAR(50)
);

INSERT INTO usuarios (email, password, rol)
VALUES (
    'admin@mail.com',
    '$2a$10$1FzDq5Tz4UuQ0Z6cFxMjF.FFmpXGfE7fJ0E8J0I6eA9ogcRnIYy9a',
    'ADMIN'
);

📫 Postman

Incluye:

Login

CRUD Productos

JWT en headers

🏁 Cómo probar todo

1️⃣ Levantar MySQL
2️⃣ Ejecutar backend
3️⃣ Ejecutar frontend
4️⃣ Login:

email: admin@mail.com  
password: admin123


5️⃣ Entrar a productos → CRUD activo
