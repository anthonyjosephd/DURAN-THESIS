//require('rootpath')();
const express = require('express');
const app = express();
var cors = require('cors')


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Users routes
app.use('/api', require('../controllers/users.controller'));
app.use('/api', require('../controllers/queue.controller'));
app.use('/api', require('../controllers/logs.controller'));
app.use('/api', require('../controllers/forecasts.controller'));
app.use('/api', require('../controllers/train_data.controller'));
app.use('/api', require('../controllers/vaccinatedusers.controller'));
app.use('/api', require('../controllers/admin_users.controller'));

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function() {
    console.log('Server listening on port ' + port);
});

module.exports = server;