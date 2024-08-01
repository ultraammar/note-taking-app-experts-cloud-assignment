
//dependencies
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const usersController = require('./controllers/usersController');
const notesController = require('./controllers/notesController');


//creating the app
const app = express();

//configure express app, for e.g to use json or other stuff like cors
app.use(cors());
app.use(express.json());





//routing
app.get('/', (req, res) => {
  return res.json( 'backend side says hello!');
}); 
//user routes
app.post('/login', usersController.login);
app.post('/signup', usersController.signup);

//note routes
app.post('/notes/getList', notesController.getNotes);
//todo new note route
app.get('/notes/:id', notesController.getNoteById);
app.delete('/notes/:id', notesController.deleteNote);

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
