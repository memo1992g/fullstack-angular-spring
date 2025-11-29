📘 DOCUMENTACIÓN – Aplicación Full Stack (Angular + Spring Boot + JWT)
📌 Descripción General del Proyecto

Esta es una aplicación Full Stack desarrollada como parte de una prueba técnica.
Incluye:

Backend en Spring Boot 3 + Java 17

Frontend en Angular 19 con Angular Material

Base de datos SQL Server (o MySQL opcional)

Autenticación segura con JWT

Autorización basada en roles

CRUD profesional de productos

📂 Estructura del Repositorio
/backend
    ├── src/main/java
    ├── src/main/resources
    ├── pom.xml
/frontend
    ├── src/app
    ├── angular.json
    ├── package.json
/sql
    └── database.sql
README.md

🔐 1. Autenticación y Seguridad

La aplicación implementa:

✔ Spring Security 6

JWT para autenticación

Roles ( ROLE_ADMIN)

Filtros personalizados

Contraseñas encriptadas con BCrypt

✔ Protección de rutas

/auth/** → público

/api/productos/** → requiere token

CRUD restringido solo para ADMIN

⚙️ 2. Requerimientos Previos
🖥️ Backend

Java 17+

Maven 3.8+

SQL Server o MySQL

🌐 Frontend

Node.js 18+

Angular CLI 19

NPM 9+

🛠️ 3. Configuración del Backend
📌 3.1 Clonar el repositorio
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd backend

📌 3.2 Configurar Base de Datos

Archivo:
src/main/resources/application.properties

SQL Server
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=fullstack
spring.datasource.username=sa
spring.datasource.password=tu_password
spring.datasource.driverClassName=com.microsoft.sqlserver.jdbc.SQLServerDriver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/fullstack?useSSL=false
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

📦 4. Dependencias del Backend (pom.xml)

Incluye:

Spring Web

Spring Security

JWT (jjwt)

Lombok

Spring Data JPA

SQL Server Driver

▶ 5. Ejecutar el Backend
mvn spring-boot:run


Se levanta en:

👉 http://localhost:8080

🧪 6. Usuario Inicial (Seeder)

Al iniciar por primera vez la aplicación, se crea automáticamente:

👤 ADMIN
email: admin@mail.com
password: admin123
role: ADMIN

📘 7. Endpoints Backend
🔑 Autenticación
POST /auth/login

Body:

{
  "email": "admin@mail.com",
  "password": "admin123"
}


Retorna un JWT:

{
  "token": "...."
}

📦 CRUD de Productos
✔ GET /api/productos
✔ GET /api/productos/{id}
✔ POST /api/productos
✔ PUT /api/productos/{id}
✔ DELETE /api/productos/{id}

Todas requieren token.

🧭 8. Configuración del Frontend (Angular)
📌 8.1 Instalación
cd frontend
npm install

📌 8.2 Ejecutar
ng serve -o


Se levanta en:

👉 http://localhost:4200

🔐 9. Comunicación con el Backend

El archivo:

src/environments/environment.ts

Debe contener:

export const environment = {
  apiUrl: 'http://localhost:8080'
};

🎨 10. Frontend – Funcionalidad
✔ Login

Formulario Material

Manejo de errores

Guarda token en localStorage

Redirige al panel

✔ Guard (authGuard)

Protege rutas según existencia de token

✔ Panel de Productos

Tabla con Angular Material

Botón crear

Acciones: editar, eliminar

Diálogo Material para confirmación

Loading spinner

Sidenav con menú lateral

✔ Crear Producto (Material)

Formulario con validaciones

Botón guardar

Redirige al listado

✔ Editar Producto (Material)

Carga datos desde backend

Actualiza registro

🗄️ 11. Script SQL (database.sql)
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    rol VARCHAR(20) NOT NULL
);

CREATE TABLE productos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    tipo VARCHAR(50)
);

-- Usuario Admin (password = admin123 encriptada)
INSERT INTO usuarios (email, password, rol)
VALUES (
    'admin@mail.com',
    '$2a$10$1FzDq5Tz4UuQ0Z6cFxMjF.FFmpXGfE7fJ0E8J0I6eA9ogcRnIYy9a',
    'ADMIN'
);

📫 12. Colección de Postman incluida

La API incluye colecciones para:

Login

CRUD

Endpoints protegidos

🏁 13. Cómo probar todo rápidamente
1️⃣ Iniciar backend
mvn spring-boot:run

2️⃣ Iniciar frontend
ng serve -o

3️⃣ Login en Angular

Email: admin@mail.com

Password: admin123

4️⃣ Ingresar a /products

CRUD funcional con JWT.