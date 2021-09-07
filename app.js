const express = require('express');
const toDoController = require('./controllers/toDoController');

const app = express();
// from yt comments
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up template engin
app.set('view engine', 'ejs');

// static files
app.use('/', express.static('./public'));
// app.use('/todo', express.static('./public'));

// fire controller
toDoController(app);

// listen to port
app.listen(3000);
console.log('You are listening to port 3000');
