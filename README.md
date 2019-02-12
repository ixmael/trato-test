# Prueba de Nodejs para TRATO
Este es el ejercicio de la sección de **Web Application**.

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

## Desarrollo
Para iniciar 
```bash
yarn run start:dev
```

## Deploy
**TODO**
