# Concesionario ULPGC

### Proyecto de curso – Producción de Software

## Diseño

- [Mockups en Figma](https://www.figma.com/file/hjHSfqp53JgXTBSCr8VQF9/MockupsConcesionario?type=design&node-id=0%3A1&mode=design&t=7HwOJH3WUtNoekuE-1)

## Pasos antes de ejecutar la aplicación por primera vez

1. Ejecutar el comando ```docker-compose up``` desde el directorio del backend para crear el contenedor de docker con la
   base de datos.
1. Descargar las dependencias de Maven en el backend.
1. Ejecutar el comando ```npm ci``` desde el directorio del frontend.

## Pasos para ejecutar la aplicación

1. Inciar el contenedor de Docker con la base de datos.
1. Para lanzar el backend ejecutar el archivo ```backend/src/main/java/ps/backend/BackendApplication.java```
1. Para lanzar el frontend ejecutar el comando ```ng serve``` desde el directorio del frontend
2. Para conectar el TPV de prueba, ejecutar ```ngrok http http://localhost:8080``` en la consola, previa instalación y
   configuración. La dirección resultante de la ejecución, añadirla a la variable de entorno TPV_URL
