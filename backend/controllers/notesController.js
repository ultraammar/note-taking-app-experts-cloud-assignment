const db = require("../database/db_connect");

async function getNotes(req, res) {
  const { user_id } = req.body;   
  const sql = `SELECT * FROM notes WHERE user_id = ${user_id};`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err); // Send a 500 status code for errors
    return res.status(200).json(results); // Send a 200 status code for successful retrieval
  });
}

async function getNoteById(req, res) {
  const { id } = req.params;
  const sql = `SELECT * FROM notes WHERE id = ${id};`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err); // Send a 500 status code for errors
    if (results.length) {
      // If a user is found, send a 200 status code
      return res.status(200).json(results);
    } else {
      // No user was found, send a 404 status code
      return res.status(404).json({ message: "Note not found." });
    }
  });
}

async function deleteNote(req, res) {
    const { id } = req.params;
    const sql = `DELETE FROM notes WHERE id = ${id};`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err); // Send a 500 status code for errors
        return res.status(200).json(results); // Send a 200 status code for successful deletion
    });
}

async function createNote(req, res) {
    const user_id = req.headers.user_id;
    console.log(req.body, req.headers.user_id);
    const {title, description} = req.body;
    const sql = `INSERT INTO notes (title, description, user_id) VALUES ('${title}', '${description}', ${user_id});`; 
    db.query(sql, (err, results) => {
        console.log(err, results);
        if (err) return res.status(500).json(err); // Send a 500 status code for errors
        return res.status(200).json(results); // Send a 200 status code for successful deletion
    });
}

module.exports = {
    getNotes,
    getNoteById,
    deleteNote,
    createNote
};