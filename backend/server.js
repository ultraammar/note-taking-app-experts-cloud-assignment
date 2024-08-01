
//dependencies
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const usersController = require('./controllers/usersController');


//creating the app
const app = express();

//configure express app, for e.g to use json or other stuff like cors
app.use(cors());
app.use(express.json());





//routing
app.get('/', (req, res) => {
  return res.json( 'backend side says hello!');
}); 

app.post('/login', usersController.login);
app.post('/signup', usersController.signup);

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
