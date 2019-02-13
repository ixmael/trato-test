# Prueba de Nodejs para TRATO
Este es el ejercicio de la sección de **Web Application**.

## Proyecto
Las carpetas principales del proyecto son:
* **client-web**: componentes básicos para generar la página inicial del sitio.
* **scripts**: programas de ayuda para la REST API.
* **src**: contiene los componentes para cargar la REST API.

## Ambiente
El proyecto require de un archivo *.env* con las variables necesarias para el proyecto. Las variables requeridas en este proyecto son:
* **Servidor**
  * APP_PORT

* **Base de datos**
  * MYSQL_DB_SOCKET
  * MYSQL_DB_HOST
  * MYSQL_DB_PORT
  * MYSQL_DB_NAME
  * MYSQL_DB_USER
  * MYSQL_DB_PASSWORD

## Recursos
El proyecto contiene un script para generar un mapeo de las tablas de la base de datos a la API REST. Para este proposito se ejectua:
```bash
yarn run generate:schema
```
Este script genera toda configuración de express routers en la carpeta *src/api*. Este debe ejecutarse antes de

## Desarrollo
Para iniciar 
```bash
yarn run start:dev
```

## Deploy
Para construir el proyecto se usa:
```bash
yarn run build
```

Para iniciar el proyecto se utiliza:
```bash
yarn run start
```
