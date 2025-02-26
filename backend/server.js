
//dependencies
const express = require('express');

if (process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
const cors = require('cors');
const usersController = require('./controllers/usersController');
const notesController = require('./controllers/notesController');
const db = require('./database/db_connect');


//creating the app
const app = express();

//configure express app, for e.g to use json or other stuff like cors
app.use(cors({
  //origin: 'https://note-taking-app-experts-cloud-assignment.vercel.app',
  origin: "https://note-taking-app-experts-cloud-assignment.vercel.app",
  //origin: process.env.NODE_ENV === 'production' ? 'https://note-taking-app-experts-cloud-assignment.vercel.app' : true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  withCredentials: true,
  
}));
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
app.post('/notes/new', notesController.createNote);
app.get('/notes/:id', notesController.getNoteById);
app.put('/notes/:id', notesController.updateNote);
app.delete('/notes/:id', notesController.deleteNote);

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
