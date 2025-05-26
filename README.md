# Login & Register System

Este proyecto es una aplicación web que permite a los usuarios registrarse, iniciar sesión, restablecer contraseñas y gestionar su cuenta. Está construido con Node.js, Express y MongoDB en el backend, y utiliza HTML, CSS y JavaScript en el frontend.

## Estructura del Proyecto

Login_Register/
|
├── public/
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   ├── scripts/
│   │   └── app.js
│   └── styles/
│       └── style.css
├── src/
│   ├── app.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── emailController.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── utils/
│       ├── db.js
│       └── emailService.js
├── index.html
├── .gitignore
├── package-lock.json
├── package.json
├── README.md

### Descripción de Carpetas y Archivos

- **`public/`**: Contiene los archivos estáticos como HTML, CSS y JavaScript para el frontend.
  - `index.html`: Página principal con formularios de inicio de sesión, registro y restablecimiento de contraseña.
  - `styles/style.css`: Estilos personalizados para la interfaz de usuario.
  - `scripts/app.js`: Lógica del frontend para manejar formularios y validaciones.

- **`src/`**: Contiene el código del backend.
  - `app.js`: Configuración principal del servidor Express.
  - `controllers/`: Controladores que manejan la lógica de negocio.
    - `authController.js`: Maneja el registro, inicio de sesión y restablecimiento de contraseñas.
    - `emailController.js`: Envía correos electrónicos de prueba utilizando Ethereal.
  - `models/`: Modelos de datos para MongoDB.
    - `userModel.js`: Esquema del usuario con campos como nombre, correo, contraseña y tokens de restablecimiento.
  - `routes/`: Define las rutas de la API.
    - `authRoutes.js`: Rutas relacionadas con la autenticación.
  - `utils/`: Utilidades compartidas.
    - `db.js`: Conexión a la base de datos MongoDB.
    - `emailService.js`: Servicio para enviar correos electrónicos reales.

## Características

- **Registro de Usuarios**: Los usuarios pueden registrarse con su nombre, correo electrónico y contraseña.
- **Inicio de Sesión**: Autenticación mediante JWT.
- **Restablecimiento de Contraseña**: Envío de correos electrónicos con enlaces para restablecer contraseñas.
- **Validación de Contraseñas**: Requisitos de seguridad como longitud mínima, mayúsculas, números y caracteres especiales.
- **Frontend Interactivo**: Formularios dinámicos con validaciones en tiempo real.

## Instalación

1. Clona este repositorio:

   git clone <URL_DEL_REPOSITORIO>
   cd Login_Register

2. Clona este repositorio:

    npm install

3. Configura las variables de entorno en el archivo .env:

   PORT=3000
   DB_URI=mongodb://localhost:27017/login_register
   JWT_SECRET=tu_secreto_jwt
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=tu_correo@gmail.com
   EMAIL_PASS=tu_contraseña

4. Iniciar el servidor:

    npm run dev

5. Abre la aplicación en tu navegador en http://localhost:3000.

## Dependencias Principales

Backend:

- `express`: Framework para construir el servidor.
- `mongoose`: ODM para MongoDB.
- `jsonwebtoken`: Manejo de autenticación con JWT.
- `bcrypt`: Encriptación de contraseñas.
- `nodemailer`: Envío de correos electrónicos.

Frontend:

- `HTML, CSS y JavaScript`: para la interfaz de usuario.
- `TailwindCSS`: para estilos rápidos y responsivos.

## Contribuye al Proyecto

¡Tu ayuda es bienvenida! Si tienes ideas para mejorar este proyecto, encuentra un error o deseas agregar nuevas funcionalidades, no dudes en contribuir.

## Licencia

Este proyecto está bajo la licencia ISC. 
