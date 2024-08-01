const mysql = require('mysql');

const db = mysql.createConnection({
    host: "mysql-3be8f42a-ultraammar-09ae.e.aivencloud.com",
    port: "12512",
    user: "avnadmin",
    password: "AVNS_lsVS1ASx4RRa6fKIQst",
    database: "defaultdb", 
});

module.exports = db;
