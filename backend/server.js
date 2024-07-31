const express = require('express');
require('dotenv').config();
const mysql = require('mysql');
const cors = require('cors');



const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: process.env.mysql_host,
    port: process.env.mysql_port,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database, 
    

});
   

app.get('/', (req, res) => {
  return res.json( 'backend side says hello!');
});

app.get('/users', (req, res) => {
  const sql = "select 1 + 2 as three;"
  db.query(sql, (err, results) => {
  if (err) return res.json(err);      
    return res.json(results);
  });
  // return res.json( 'backend side says hello!');
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
