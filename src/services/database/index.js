const mysql = require('mysql');

const database = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  port: process.env.MYSQL_DB_PORT,
  //name: process.env.MYSQL_DB_NAME,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  socketPath: process.env.MYSQL_DB_SOCKET ? process.env.MYSQL_DB_SOCKET : null,
  insecureAuth : true,
});

database.connect(function(err) {
  if (err)
    throw err;
  
  console.log("Connected to the Database!");
});

module.exports = database;
