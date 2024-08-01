const db = require("../database/db_connect");


async function login(req, res) {
  const { username, password } = req.body;
  console.log(username, password);

  // Check if the username already exists
  const checkSql = `SELECT * FROM users WHERE username = '${username}';`;
  db.query(checkSql, (err, existingUser) => {
    if (err) return res.status(500).json({ message: "unknown error, check the console.", error: err });
    if (existingUser.length) {
      // Check if the password is correct
      const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`;
      db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: "unknown error, check the console.", error: err });

        if (results.length) {
          // If a user is found with the correct password, send a 200 status code
      return res.status(200).json(results);
    } else {
          // Incorrect password, send a 401 status code
          return res.status(401).json({ message: "User exists, but password is incorrect." });
    }
  });
    } else {
      // Username not found, send a 404 status code
      return res.status(404).json({ message: "Username does not exist." });
}
  });
}

async function signup(req, res) {
  const { username, password } = req.body;
  console.log(username, password);

  // Check if the username already exists
  const checkSql = `SELECT * FROM users WHERE username = '${username}';`;
  db.query(checkSql, (err, existingUser) => {
      if (existingUser.length) {
          // Username already exists, return an error
          console.log("an existing user was found");
          return res.status(400).json({ message: "Username already exists." });
      } else {
        // Insert the new user
        const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}');`;
        db.query(sql, (err, results) => {
          if (err) return res.status(500).json(err); // Send a 500 status code for errors
          return res.status(201).json({message: "Username created successfully."}); // Send a 201 status code for successful creation
        });
      }
    if (err) return res.status(500).json(err); // Send a 500 status code for errors
  });
}

module.exports = {
  login,
  signup,
};