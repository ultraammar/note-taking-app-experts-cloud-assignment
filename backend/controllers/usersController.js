const db = require('../database/db_connect');

async function login(req, res) {
    const {username, password} = req.body;
    console.log(username, password);
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`
    db.query(sql, (err, results) => {
      if (err) return res.json(err);
      return res.json(results);
    });
  }
  

module.exports = {
    login
}