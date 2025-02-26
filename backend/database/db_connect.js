const mysql = require('mysql');
if (process.env.NODE_ENV != "production"){
    require('dotenv').config();
}      

const db = mysql.createConnection({
    host: process.env.mysql_host,
    port: process.env.mysql_port,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database, 
});

module.exports = db;
